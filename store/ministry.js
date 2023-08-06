export const state = () => ({
    ministry: {},
    loading:false
})

export const mutations = {
    setLoading(state, data) {
      state.loading = data  
    },
    setMinistry(state, data) {
        state.ministry = data
    }
}

export const actions = {
    async createMinistry({ commit }, data) {
        commit('setLoading', true);
        const formData = new FormData;
        formData.append('file', data.profile);
        const title = data.ministry_title;
        try {
            const image = await this.$axios.post('upload', formData)
                .then((res) => {
                    return res?.data?.url
            })
            if (image) {
                await this.$axios.post('/ministry', { profile: image, ministry_title: title })
                .then((res) => {
                    console.log(res.data);
                    commit('setLoading', false);
                }).catch((err) => {
                    console.log(err);
                    commit('setLoading', false);
                })

            }
        } catch (error) {
            console.log(error);
        }
    },
    async getMinistry({ commit }) {
        commit("setLoading", true);
        await this.$axios.get('/ministryData')
            .then((res) => {
                commit('setMinistry', res.data);
                commit('setLoading', false)
        })
    },
    async deleteMinistry({ commit }, id) {
        console.log(id);
        commit('setLoading', true);
        await this.$axios.delete(`/ministry/${id}`)
            .then((res) => {
                console.log(res.data);
                commit('setLoading',false);
            }).catch((err) => {
                console.log(err);
                commit("setLoading", false)
        })
    }
}