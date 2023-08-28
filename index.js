panel.plugin('diverently/writer-block', {
    created(Vue) {
        const unsubscribe = Vue.$store.subscribeAction(async (action, state) => {
            // Fetch options once, but only if user is logged in
            if (Vue.$user === undefined || Vue.$user === null) return;

            unsubscribe();

            Vue.$store.registerModule('writerBlock', {
                state: () => ({
                    options: {}
                }),
                mutations: {
                    updateOptions(state, options) {
                        state.options = options;
                    }
                },
                actions: {
                    updateOptions({ commit }, { options }) {
                        commit('updateOptions', options);
                    }
                }
            });

            const options = await Vue.$api.get('writer-block');

            // Update store
            Vue.$store.dispatch({
                type: 'updateOptions',
                options: options
            });
        });
    },
    blocks: {
        writer: {
            computed: {
                options() {
                    return this.$store.state.writerBlock.options;
                },
            },
            template: `
                <div>
                    <k-writer
                        :nodes="options.nodes"
                        :marks="options.marks"
                        :value="content.text"
                        @input="update({ text: $event })"
                    />
                </div>
            `,
        }
    }
})
