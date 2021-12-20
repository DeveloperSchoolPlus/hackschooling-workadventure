<script lang="typescript">
    import { fly } from 'svelte/transition';
    import {helpCameraSettingsVisibleStore} from "../../Stores/HelpCameraSettingsStore";
    import firefoxImg from "./images/help-setting-camera-permission-firefox.png";
    import chromeImg from "./images/help-setting-camera-permission-chrome.png";
    import {getNavigatorType, isAndroid as isAndroidFct, NavigatorType} from "../../WebRtc/DeviceUtils";

    let isAndroid = isAndroidFct();
    let isFirefox = getNavigatorType() === NavigatorType.firefox;
    let isChrome = getNavigatorType() === NavigatorType.chrome;

    function refresh() {
        window.location.reload();
    }

    function close() {
        helpCameraSettingsVisibleStore.set(false);
    }

</script>

<form class="helpCameraSettings nes-container" on:submit|preventDefault={close} transition:fly="{{ y: -900, duration: 500 }}">
    <section>
        <h2>Accès caméra/micro requis</h2>
        <p class="err">Permission refusée</p>
        <p>Vous devez autoriser l'accès à la caméra et au microphone dans votre navigateur.</p>
        <p>
            {#if isFirefox }
                <p class="err">Veuillez cocher la case "Se souvenir de cette décision" si vous ne voulez pas que Firefox continue de vous demander l'autorisation.</p>
                <img src={firefoxImg} alt="" />
            {:else if isChrome && !isAndroid }
                <img src={chromeImg} alt="" />
            {/if}
        </p>
    </section>
    <section>
        <button class="helpCameraSettingsFormRefresh nes-btn" on:click|preventDefault={refresh}>Rafraîchir</button>
        <button type="submit" class="helpCameraSettingsFormContinue nes-btn is-primary" on:click|preventDefault={close}>Continuer sans webcam</button>
    </section>
</form>


<style lang="scss">
    .helpCameraSettings {
        pointer-events: auto;
        background: #eceeee;
        margin-left: auto;
        margin-right: auto;
        margin-top: 10vh;
        max-height: 80vh;
        max-width: 80vw;
        overflow: auto;
        text-align: center;

        h2 {
            font-family: 'Press Start 2P';
        }

        section {
            p {
                margin: 15px;
                font-family: 'Press Start 2P';

                & .err {
                    color: #ff0000;
                }
            }
            img {
                max-width: 500px;
                width: 100%;
            }
        }
    }
</style>
