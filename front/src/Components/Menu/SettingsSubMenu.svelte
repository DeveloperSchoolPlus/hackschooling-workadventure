<script lang="typescript">
import {localUserStore} from "../../Connexion/LocalUserStore";
import {videoConstraintStore} from "../../Stores/MediaStore";
import {HtmlUtils} from "../../WebRtc/HtmlUtils";
import {isMobile} from "../../Enum/EnvironmentVariable";
import {menuVisiblilityStore} from "../../Stores/MenuStore";

let fullscreen : boolean = localUserStore.getFullscreen();
let notification : boolean = localUserStore.getNotification() === 'granted';
let valueGame : number = localUserStore.getGameQualityValue();
let valueVideo : number = localUserStore.getVideoQualityValue();
let previewValueGame = valueGame;
let previewValueVideo =  valueVideo;

function saveSetting(){
    if (valueGame !== previewValueGame) {
        previewValueGame = valueGame;
        localUserStore.setGameQualityValue(valueGame);
        window.location.reload();
    }

    if (valueVideo !== previewValueVideo) {
        previewValueVideo = valueVideo;
        videoConstraintStore.setFrameRate(valueVideo);
    }

    closeMenu();
}

function changeFullscreen() {
    const body = HtmlUtils.querySelectorOrFail('body');
    if (body) {
        if (document.fullscreenElement !== null && !fullscreen) {
            document.exitFullscreen()
        } else {
            body.requestFullscreen();
        }
        localUserStore.setFullscreen(fullscreen);
    }
}

function changeNotification() {
    if (Notification.permission === 'granted') {
        localUserStore.setNotification(notification ? 'granted' : 'denied');
    } else {
        Notification.requestPermission().then((response) => {
            if (response === 'granted') {
                localUserStore.setNotification(notification ? 'granted' : 'denied');
            } else {
                localUserStore.setNotification('denied');
                notification = false;
            }
        })
    }
}

function closeMenu() {
    menuVisiblilityStore.set(false);
}
</script>

<div class="settings-main" on:submit|preventDefault={saveSetting}>
    <section>
        <h3>Qualité de jeu</h3>
        <div class="nes-select is-dark">
            <select bind:value={valueGame}>
                <option value="{120}">{isMobile() ? 'Élevé (120 fps)' : 'Haute qualité vidéo (120 fps)'}</option>
                <option value="{60}">{isMobile() ? 'Moyenne (60 fps)' : 'Qualité vidéo moyenne (60 fps, recommended)'}</option>
                <option value="{40}">{isMobile() ? 'Minimale (40 fps)' : 'Qualité vidéo minimale (40 fps)'}</option>
                <option value="{20}">{isMobile() ? 'Basse (20 fps)' : 'Qualité vidéo basse (20 fps)'}</option>
            </select>
        </div>
    </section>
    <section>
        <h3>Qualité vidéo</h3>
        <div class="nes-select is-dark">
            <select bind:value={valueVideo}>
                <option value="{30}">{isMobile() ? 'Élevé (30 fps)' : 'Haute qualité vidéo (30 fps)'}</option>
                <option value="{20}">{isMobile() ? 'Moyenne (20 fps)' : 'Qualité vidéo moyenne (20 fps, recommended)'}</option>
                <option value="{10}">{isMobile() ? 'Minimale (10 fps)' : 'Qualité vidéo minimale (10 fps)'}</option>
                <option value="{5}">{isMobile() ? 'Basse (5 fps)' : 'Qualité vidéo basse (5 fps)'}</option>
            </select>
        </div>
    </section>
    <section class="settings-section-save">
        <p>(L'enregistrement de ces paramètres redémarrera le jeu)</p>
        <button type="button" class="nes-btn is-primary" on:click|preventDefault={saveSetting}>Enregistrer</button>
    </section>
    <section class="settings-section-noSaveOption">
        <label>
            <input type="checkbox" class="nes-checkbox is-dark" bind:checked={fullscreen} on:change={changeFullscreen}/>
            <span>Plein écran</span>
        </label>
        <label>
            <input type="checkbox" class="nes-checkbox is-dark" bind:checked={notification} on:change={changeNotification}>
            <span>Notifications</span>
        </label>
    </section>
</div>

<style lang="scss">
  div.settings-main {
    height: calc(100% - 40px);
    overflow-y: auto;

    section {
      width: 100%;
      padding: 20px 20px 0;
      margin-bottom: 20px;
      text-align: center;

      div.nes-select select:focus {
        outline: none;
      }
    }
    section.settings-section-save {
      text-align: center;
      p {
        margin: 16px 0;
      }
    }
    section.settings-section-noSaveOption {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      label {
        flex: 1 1 auto;
        text-align: center;
        margin: 0 0 15px;
      }
    }
  }

  @media only screen and (max-width: 800px), only screen and (max-height: 800px) {
    div.settings-main {
      section {
        padding: 0;
      }
    }
  }
</style>
