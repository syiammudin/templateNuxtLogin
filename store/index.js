export const state = () => ({
    userList: [],
    statusColor: ["grey", "orange", "red", "black"]
});


export const mutations = {
    setUserList(state, data) {
        state.userList = data;
    },
};

export const actions = {
    async fetchUser({ commit }, params = { 'type': 'list' }) {
        const user = await this.$axios.$get("/api/user", { params });
        commit("setUserList", user);
    },
};

