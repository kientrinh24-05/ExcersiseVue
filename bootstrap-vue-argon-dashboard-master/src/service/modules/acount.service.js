import Api from "@/service";

export default {
    signIn(user) {
        return Api().post("signin", user);
    }
}