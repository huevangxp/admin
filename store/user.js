export const state = () => ({
    loading: false,
    admin:{}
})

export const mutations = {
    setAdmin(state, data) {
        state.admin = data
    },
    setLoading(state, data) {
        state.loading = data
    }
}

export const actions = {
    async getAdmin({ commit }) {
        await this.$axios.get('/users')
            .then((res) => {
                commit('setAdmin', res.data);
        })
    },
    async createAdmin({ commit }, data) {
        try {
        console.log('dta',data);
            commit('setLoading', true);
        const formData = new FormData;
        formData.append('file', data.images);
        // const title = data.ministry_title;
            const image = await this.$axios.post('upload', formData)
                .then((res) => {
                    return res?.data?.url
                })
            // console.log('image', image);
            if (image) {
                let userData = {
                    name: data.name,
                    lastName: data.lastName,
                    profile: image,
                    phone: data.phone,
                    email: data.email,
                    status: data.status,
                    role: data.role,
                    position: data.position,
                    password: data.password
                }
                await this.$axios.post('/user', userData)
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
    async deleteUser({ commit }, id) {
        try {
            await this.$axios.delete(`/user/${id}`)
                .then((res) => {
                console.log(res.data);
            })
        } catch (error) {
            console.log(error);
        }
    }
}