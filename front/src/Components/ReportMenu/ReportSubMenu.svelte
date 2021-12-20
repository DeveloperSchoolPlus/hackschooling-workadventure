<script lang="ts">
    import {showReportScreenStore, userReportEmpty} from "../../Stores/ShowReportScreenStore";
    import {gameManager} from "../../Phaser/Game/GameManager";

    export let userUUID: string | undefined;
    let reportMessage: string;
    let hiddenError = true;

    function submitReport() {
        if (reportMessage === '') {
            hiddenError = true;
        } else {
            hiddenError = false;
            if( userUUID === undefined) {
                console.error('L\'UUID de l\'utilisateur n\'est pas valide.');
                return;
            }
            gameManager.getCurrentGameScene().connection?.emitReportPlayerMessage(userUUID, reportMessage);
            showReportScreenStore.set(userReportEmpty)
        }
    }
</script>

<div class="report-container-main">
    <h3>Signaler</h3>
    <p>Envoyez un message de rapport aux administrateurs de cette salle. Ils peuvent par la suite bannir cet utilisateur.</p>
    <form>
        <section>
            <label>
                <span>Votre message: </span>
                <textarea type="text" class="nes-textarea" bind:value={reportMessage}></textarea>
            </label>
            <p hidden="{hiddenError}">Le message de rapport ne peut pas être vide.</p>
        </section>
        <section>
            <button type="submit" class="nes-btn is-error" on:click={submitReport}>Signaler cet utilisateur</button>
        </section>
    </form>
</div>

<style lang="scss">
    div.report-container-main {
      text-align: center;

      textarea {
        height: clamp(100px, 15vh, 300px);
      }
    }

    @media only screen and (max-height: 630px) {
      div.report-container-main textarea {
        height: 50px;
      }
    }
</style>
