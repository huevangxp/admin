export const state = () => ({
    province: {},
    department:{},
    loading: false,
    address: []

})

export const mutations = {
    setLoading(state, data) {
        state.loading = data
    },
    setProvince(state, data) {
        state.province = data
    },
    setAddress(state, data) {
        state.address = data;
    },
    setDepartment(state, data) {
        state.department = data
    }
}

export const actions = {
    async getProvince({ commit }) {
        await this.$axios.get('/province')
            .then((res) => {
                // console.log(res.data);
                commit('setProvince', res.data)
            })
    },
    async getAllProvince({ commit }) {
        this.$axios.get('/address/province')
            .then((res) => {
                // console.log(res.data);
                commit('setAddress', res?.data)
            })
    },
    async createProvince({ commit }, data) {
        commit('setLoading', true);
        const formData = new FormData;
        formData.append('file', data.profile);
        const province_title = data.province;
        try {
            const image = await this.$axios.post('upload', formData)
                .then((res) => {
                    return res?.data?.url
                })
            if (image) {
                await this.$axios.post('/province', {profile: image, province_title})
                    .then((data) => {
                        console.log(data.data);
                        commit('setLoading', false)
                })
            }

        } catch (e) {
            console.log(e);
            commit('setLoading', false)
        }
    },
    async getDepartment({ commit }, ) {
       try {
           await this.$axios.get('/rarul_department')
               .then((res) => {
            //    console.log(res.data);
                   commit('setDepartment', res?.data)
           })
       } catch (error) {
        console.log(error);
       }
    }
}