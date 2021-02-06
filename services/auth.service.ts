import axios from "axios";
import {config} from "../constants/api";
import Keycloak from 'keycloak-js';
import { RNKeycloak } from '@react-keycloak/native';
import {
    IKeycloakConfiguration,
    KeycloakProvider,
    useKeycloak,
} from 'expo-keycloak';

const keycloakFormData = () => {
    const formData = new URLSearchParams();
    formData.append('grant_type', 'password');
    formData.append('client_id', 'ressource-server');
    return formData;
};

export const authState = {
    token: ''
    // token: localStorage.getItem("token")
};

export const keycloak: IKeycloakConfiguration = {
    url: `${config.AUTH_SERVER}`,
    realm: "ensapay",
    clientId: "resource-server",
    scopes: ['email', 'profile'],
    redirectUri: config.REDIRECT_URI,
    // usePKCE: true,
};


export const login = (username: string, password: string) => {
    const body = keycloakFormData();
    body.append("username", username);
    body.append("password", password);
    return axios.post(config.AUTH_SERVER, body)
        .then(response => localStorage.setItem("access_token", response.data.access_token))
        .catch(error => console.log(error.data));
};

export const loadUserInfo = (token: string) => {
    // const {
    //     ready, // If the discovery is already fetched
    //     login, // The login function - opens the browser
    //     isLoggedIn, // Helper boolean to use e.g. in your components down the tree
    //     token, // Access token, if available
    //     logout, // Logs the user out
    // } = useKeycloak();
    // const body = keycloakFormData();
    // body.append("username", "superadmin");
    // body.append("password", "secret");
    return axios.get(config.AUTH_SERVER + '/realms/ensapay/protocol/openid-connect/userinfo', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    // return axios.post(config.AUTH_SERVER, body)
    //     .then(response => localStorage.setItem("access_token", response.data.access_token))
    //     .catch(error => console.log(error.data));
};
