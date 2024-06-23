<template>
    <div class="otc-detail">
        <!-- 返回按钮 -->
        <button @click="goBack" class="back-button">返回</button>
        <h2>药品详情</h2>
        <div v-if="showAllMedicines">
            <h3>所有药品:</h3>
            <ul>
                <li v-for="medicine in medicines" :key="medicine.entity">{{ medicine.entity }}</li>
            </ul>
        </div>
        <div v-else-if="symptomName">
            <p>症状: {{ symptomName }}</p>
            <div v-if="filteredMedicines.length">
                <h3>推荐的药品:</h3>
                <ul>
                    <li v-for="medicine in filteredMedicines" :key="medicine.entity">{{ medicine.entity }}</li>
                </ul>
            </div>
            <div v-else>
                <p>没有找到推荐的药品。</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "OtcDetail",
    props: {
        symptomName: {
            type: String,
            default: ''
        },
        showAllMedicines: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            medicines: [],
            filteredMedicines: []
        };
    },
    created() {
        // 加载药品数据
        fetch('/medical_ner_entities.json')
            .then(response => response.json())
            .then(data => {
                this.medicines = data.annotations.filter(item => item.label === '药品');
                if (this.showAllMedicines) {
                    this.filteredMedicines = this.medicines;
                } else if (this.symptomName) {
                    this.filteredMedicines = this.medicines.filter(medicine =>
                        medicine.related_symptoms && medicine.related_symptoms.includes(this.symptomName)
                    );
                }
                console.log('Filtered Medicines:', JSON.stringify(this.filteredMedicines, null, 2));
            })
            .catch(error => console.error('Error loading medicines:', error));
    },
    methods: {
        goBack() {
            // 使用 Vue Router 导航回 home 页面
            this.$router.push({ path: '/home' });
        }
    }
};
</script>

<style scoped>
.otc-detail {
    padding: 10px;
    background: #f9f9f9;
    border-radius: 10px;
    margin-top: 20px;
    position: relative;
}

.back-button {
    position: absolute;
    /* 固定位置 */
    top: 10px;
    /* 距离顶部10px */
    left: 10px;
    /* 距离左侧10px */
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.back-button:hover {
    background-color: #0056b3;
}

h2 {
    font-size: 24px;
    margin-bottom: 10px;
}

h3 {
    font-size: 20px;
    margin-top: 20px;
}

p {
    font-size: 16px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    font-size: 16px;
    margin: 5px 0;
    color: #007bff;
}
</style>
