<template>
    <div class="test-self">
        <h3 class="title">常见症状</h3>
        <div class="symptom-list">
            <div v-for="(symptom, index) in symptoms" :key="index" class="symptom-item" @click="showMedicines(symptom)">
                <img :src="symptom.icon" :alt="symptom.name" class="icon" />
                <p class="name">{{ symptom.name }}</p>
            </div>
        </div>

        <div v-if="selectedMedicines.length" class="medicines-list">
            <h4>可用药品:</h4>
            <ul>
                <li v-for="medicine in selectedMedicines" :key="medicine.entity" @click="goToMedicineDetail(medicine)">
                    {{ medicine.entity }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "TestSelf",
    data() {
        return {
            symptoms: [
                { name: "失眠", icon: require('@/assets/icons/sleep.png'), id: 1 },
                { name: "腹泻", icon: require('@/assets/icons/diarrhea.png'), id: 2 },
                { name: "咳嗽", icon: require('@/assets/icons/cough.png'), id: 3 },
                { name: "月经不调", icon: require('@/assets/icons/menstrual.png'), id: 4 },
                { name: "头痛", icon: require('@/assets/icons/headache.png'), id: 5 },
                { name: "慢性胃炎", icon: require('@/assets/icons/gastritis.png'), id: 6 },
                { name: "便秘", icon: require('@/assets/icons/constipation.png'), id: 7 },
                { name: "更多", icon: require('@/assets/icons/more.png'), id: 8 },
            ],
            medicines: [], // 初始化为一个空数组
            selectedMedicines: [] // 存储当前症状的药品
        };
    },
    created() {
        // 在组件创建时加载药品数据
        fetch('/medical_ner_entities.json')
            .then(response => response.json())
            .then(data => {
                this.medicines = data.annotations.filter(item => item.label === '药品');
                console.log('Medicines loaded:', JSON.stringify(this.medicines, null, 2)); // 调试输出
            })
            .catch(error => console.error('Error loading medicines:', error));
    },
    methods: {
        showMedicines(symptom) {
            if (symptom.name === "更多") {
                // 跳转到显示所有药品的页面
                this.$router.push({ name: 'OtcDetail', query: { showAllMedicines: true } });
            } else {
                // 根据症状名匹配相关药品，并在当前页面显示
                console.log('Symptom name:', symptom.name); // 调试输出
                this.selectedMedicines = this.medicines.filter(medicine =>
                    medicine.related_symptoms && medicine.related_symptoms.includes(symptom.name)
                );
                console.log('Filtered medicines:', JSON.stringify(this.selectedMedicines, null, 2)); // 调试输出

                // 确保选定药品更新后页面显示
                this.$forceUpdate();
            }
        },
        goToMedicineDetail(medicine) {
            // 跳转到药品详情页
            this.$router.push({ name: 'MedicineDetail', params: { name: medicine.entity } });
        }
    }
};
</script>

<style scoped>
.test-self {
    text-align: center;
    padding: 10px;
    border-radius: 10px;
    background: linear-gradient(to bottom, #efd998 1%, #fdfdfd 99%);
}

.title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: left;
    margin-left: 5px;
}

.symptom-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
    padding: 5px;
}

.symptom-item {
    margin: 5px;
    width: auto;
    box-sizing: border-box;
    cursor: pointer;
    transition: transform 0.2s;
}

.symptom-item:hover {
    transform: scale(1.1);
}

.icon {
    width: 30px;
    height: 30px;
    margin-bottom: 5px;
}

.name {
    font-size: 14px;
    color: #333;
}

.medicines-list {
    margin-top: 20px;
    text-align: left;
    margin-left: 5px;
}

.medicines-list ul {
    list-style-type: none;
    padding: 0;
}

.medicines-list li {
    cursor: pointer;
    color: #007bff;
    transition: color 0.3s;
}

.medicines-list li:hover {
    color: #0056b3;
    text-decoration: underline;
}
</style>
