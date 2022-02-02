import { SelectCharacterSceneName } from "./SelectCharacterScene";
import { ResizableScene } from "./ResizableScene";
import { loginSceneVisibleIframeStore, loginSceneVisibleStore } from "../../Stores/LoginSceneStore";
import { localUserStore } from "../../Connexion/LocalUserStore";
import { connectionManager } from "../../Connexion/ConnectionManager";
import { gameManager } from "../Game/GameManager";
import { analyticsClient } from "../../Administration/AnalyticsClient";
import Axios from "axios";
import { userIsConnected } from "../../Stores/MenuStore";

export const LoginSceneName = "LoginScene";

export class LoginScene extends ResizableScene {
    private name: string = "";

    constructor() {
        super({
            key: LoginSceneName,
        });
        this.name = gameManager.getPlayerName() || "";
    }

    preload() {}

    create() {
        loginSceneVisibleIframeStore.set(false);
        //If authentication is mandatory, push authentication iframe
        if (
            localUserStore.getAuthToken() == undefined &&
            gameManager.currentStartedRoom &&
            gameManager.currentStartedRoom.authenticationMandatory
        ) {
            connectionManager.loadOpenIDScreen();
            loginSceneVisibleIframeStore.set(true);
        }
        loginSceneVisibleStore.set(true);
    }

    public async login(name: string): Promise<void> {
        analyticsClient.validationName();

        // Used to filter user based on server's CSV

        if (!await gameManager.isAllowedToLogin(name)) {
            throw Error("Not allowed");
        }

        name = name.trim();
        gameManager.setPlayerName(name);
        userIsConnected.set(true);

        this.scene.stop(LoginSceneName);
        gameManager.tryResumingGame(SelectCharacterSceneName);
        this.scene.remove(LoginSceneName);
        loginSceneVisibleStore.set(false);
    }

    update(time: number, delta: number): void {}

    public onResize(): void {}
}
