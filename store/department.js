export const state = () => ({
    department: {},
    departmentDO: {},
    loading: false
});

export const mutations = {
    setLoading(state, data) {
        state.loading = data;
    },
    setDepartment(state, data) {
        state.department = data;
    },
    setDepartmentDO(state, data) {
        state.departmentDO = data;
    },
   
}

export const actions = {
    async createDepartmentDO({ commit }, data) {
        commit("setLoading", true);
        await this.$axios.post('/department-organization', data)
            .then((res) => {
                console.log(res.data);
                commit("setLoading", false);
            }).catch((err) => {
                console.log(err);
                commit("setLoading", false);
            })
    },
    async getDepartment({ commit }, id) {
        commit("setLoading", true);
        const response = await this.$axios.get(`/department/${id}`)
            .then((res) => {
                commit('setDepartment', res.data);
                commit("setLoading", false);
                return res.data
            }).catch(err => {
                return []
            })
        console.log(response);
        return response;
    },
    async createDepartment({ commit }, data) {
        await this.$axios.post('/department', data)
            .then((res) => {
                console.log(res.data);
            })
    },
    async getDepartmentDO({ commit }, id) {
        commit('setLoading', true);
        await this.$axios.get(`/department-organizations/${id}`)
            .then((res) => {
                console.log(res.data);
                commit('setDepartmentDO', res?.data);
                commit('setLoading', false);
            }).catch((err) => {
                console.log(err);
                commit('setLoading', false);
            })
    }
}