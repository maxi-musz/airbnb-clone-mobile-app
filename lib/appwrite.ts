import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from 'expo-web-browser';
import { Alert } from "react-native";

export const config = {
    platform: "com.maximus.airbnb",
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOIND,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID
}

export const client = new Client();

client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!)

export const avatar = new Avatars(client)
export const account = new Account(client)

export async function login() {
    try {
        const redirectUri = Linking.createURL("/");

        const response = await account.createOAuth2Token(
            OAuthProvider.Google,
            redirectUri
        );
        if (!response) throw new Error("Create OAuth2 token failed");

        const browserResult = await openAuthSessionAsync(
            response.toString(),
            redirectUri
        );
        if (browserResult.type !== "success")
            throw new Error("Create OAuth2 token failed");

        const url = new URL(browserResult.url);
        const secret = url.searchParams.get("secret")?.toString();
        const userId = url.searchParams.get("userId")?.toString();
        console.log("Secret: ", secret)
        console.log("userId ", userId)
        if (!secret || !userId) throw new Error("Create OAuth2 token failed");

        try {
            // This was missing - creating the session with the obtained credentials
            const session = await account.createSession(userId, secret);
            if (!session) throw new Error("Failed to create session");
            console.log("Session created successfully");
        } catch (error) {
            console.log("Error creating session", error)
            Alert.alert("Error creating session")
            throw error; // Re-throw to be caught by outer catch
        }

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function logout() {
    console.log("Logging out user")

    try {
        await account.deleteSession('current');
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

export async function getCurrentUser() {
    try {
        const result = await account.get();
        if (result.$id) {
            const userAvatar = avatar.getInitials(result.name);

            return {
                ...result,
                avatar: userAvatar.toString(),
            };
        }

        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}