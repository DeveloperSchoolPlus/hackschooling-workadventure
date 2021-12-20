<script lang="ts">
    import { gameManager } from "../../Phaser/Game/GameManager";
    import {onMount} from "svelte";

    let gameScene = gameManager.getCurrentGameScene();

    let expandedMapCopyright = false;
    let expandedTilesetCopyright = false;

    let mapName: string = "";
    let mapDescription: string = "";
    let mapCopyright: string = "Le créateur de la carte n'a pas déclaré de copyright pour la carte.";
    let tilesetCopyright: string[] = [];

    onMount(() => {
        if (gameScene.mapFile.properties !== undefined) {
            const propertyName = gameScene.mapFile.properties.find((property) => property.name === 'mapName')
            if ( propertyName !== undefined && typeof propertyName.value === 'string') {
                mapName = propertyName.value;
            }
            const propertyDescription = gameScene.mapFile.properties.find((property) => property.name === 'mapDescription')
            if (propertyDescription !== undefined && typeof propertyDescription.value === 'string') {
                mapDescription = propertyDescription.value;
            }
            const propertyCopyright = gameScene.mapFile.properties.find((property) => property.name === 'mapCopyright')
            if (propertyCopyright !== undefined && typeof propertyCopyright.value === 'string') {
                mapCopyright = propertyCopyright.value;
            }
        }

        for (const tileset of gameScene.mapFile.tilesets) {
            if (tileset.properties !== undefined) {
                const propertyTilesetCopyright = tileset.properties.find((property) => property.name === 'tilesetCopyright')
                if (propertyTilesetCopyright !== undefined && typeof propertyTilesetCopyright.value === 'string') {
                    tilesetCopyright = [...tilesetCopyright, propertyTilesetCopyright.value]; //Assignment needed to trigger Svelte's reactivity
                }
            }
        }
    })
</script>

<div class="about-room-main">
    <h2>Informations sur la carte</h2>
    <section class="container-overflow">
        <h3>{mapName}</h3>
        <p class="string-HTML">{mapDescription}</p>
        <h3 class="nes-pointer hoverable" on:click={() => expandedMapCopyright = !expandedMapCopyright}>Droits d'auteur de la carte</h3>
        <p class="string-HTML" hidden="{!expandedMapCopyright}">{mapCopyright}</p>
        <h3 class="nes-pointer hoverable" on:click={() => expandedTilesetCopyright = !expandedTilesetCopyright}>Droits d'auteur des ensembles de tuiles</h3>
        <section hidden="{!expandedTilesetCopyright}">
            {#each tilesetCopyright as copyright}
                <p class="string-HTML">{copyright}</p>
            {:else}
                <p>Le créateur de la carte n'a pas déclaré de copyright pour les ensembles de tuiles. Attention, cela ne signifie pas que ces ensembles de tuiles n'ont pas de licence.</p>
            {/each}
        </section>
    </section>
</div>


<style lang="scss">
  .string-HTML{
    white-space: pre-line;
  }

  div.about-room-main {
    height: calc(100% - 56px);

    h2, h3 {
      width: 100%;
      text-align: center;
    }

    h3.hoverable:hover {
      background-color: #3c3e40;
      border-radius: 32px;
    }

    section.container-overflow {
      height: calc(100% - 220px);
      margin: 0;
      padding: 0;
      overflow-y: auto;
    }
  }

  @media only screen and (max-width: 800px), only screen and (max-height: 800px) {
    div.about-room-main {
      section.container-overflow {
        height: calc(100% - 120px);
      }
    }
  }
</style>
