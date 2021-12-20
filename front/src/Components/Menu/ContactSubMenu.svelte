<script lang="ts">

    function goToGettingStarted() {
        const sparkHost = "https://workadventu.re/getting-started";
        window.open(sparkHost, "_blank");
    }

    function goToBuildingMap() {
        const sparkHost = "https://workadventu.re/map-building/";
        window.open(sparkHost, "_blank");
    }

    import {contactPageStore} from "../../Stores/MenuStore";
</script>

<div class="create-map-main">
    <section class="container-overflow">
        <section>
            <h3>Commencer</h3>
            <p>
                WorkAdventure vous permet de créer un espace en ligne pour communiquer spontanément avec les autres.
                Et tout commence par la création de votre propre espace. Choisissez parmi une large sélection de cartes préfabriquées par notre équipe.
            </p>
            <button type="button" class="nes-btn is-primary" on:click={goToGettingStarted}>Commencer</button>
        </section>

        <section>
            <h3>Créez votre carte</h3>
            <p>Vous pouvez également créer votre propre carte personnalisée en suivant l'étape de la documentation.</p>
            <button type="button" class="nes-btn" on:click={goToBuildingMap}>Créez votre carte</button>
        </section>

        <iframe title="contact"
                src="{$contactPageStore}"
                allow="clipboard-read; clipboard-write self {$contactPageStore}"
                allowfullscreen></iframe>
    </section>
</div>

<style lang="scss">
    div.create-map-main {
      height: calc(100% - 56px);

      text-align: center;

      section {
        margin-bottom: 50px;
      }

      section.container-overflow {
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: auto;
      }
    }

    iframe {
      border: none;
      height: calc(100% - 56px);
      width: 100%;
      margin: 0;
    }
</style>
