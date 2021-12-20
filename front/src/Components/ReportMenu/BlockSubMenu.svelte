<script lang="ts">
    import {blackListManager} from "../../WebRtc/BlackListManager";
    import {showReportScreenStore, userReportEmpty} from "../../Stores/ShowReportScreenStore";
    import {onMount} from "svelte";

    export let userUUID: string | undefined;
    export let userName: string;
    let userIsBlocked = false;

    onMount(() => {
        if (userUUID === undefined) {
            userIsBlocked = false;
            console.error("Il n'y a aucun utilisateur à bloquer");
        } else {
            userIsBlocked = blackListManager.isBlackListed(userUUID);
        }
    })

    function blockUser(): void {
        if (userUUID === undefined) {
            console.error("Il n'y a aucun utilisateur à bloquer");
            return;
        }
        blackListManager.isBlackListed(userUUID)
            ? blackListManager.cancelBlackList(userUUID)
            : blackListManager.blackList(userUUID);
        showReportScreenStore.set(userReportEmpty); //close the report menu
    }
</script>

<div class="block-container">
    <h3>Bloquer</h3>
    <p>Bloquer toute communication de et vers {userName}. Cela peut être inversé.</p>
    <button type="button" class="nes-btn is-error" on:click|preventDefault={blockUser}>
        {userIsBlocked ? 'Débloquer cet utilisateur' : 'Bloquer cet utilisateur'}
    </button>
</div>


<style lang="scss">
    div.block-container {
      text-align: center;
    }
</style>
