<template>
    <div>
        <button @click="goBack" class="back-button">返回</button>
    </div>

    <div class="medicine-detail">
        <h2>{{ medicine.entity }}</h2>
        <p><strong>功效：</strong>{{ medicine.effect }}</p>
        <p><strong>常见名称：</strong>{{ medicine.common_name }}</p>
        <!-- 其他药品详细信息 -->
    </div>
</template>

<script>
export default {
    name: 'MedicineDetail',
    data() {
        return {
            medicine: {} // 用于存储当前药品信息
        };
    },
    created() {
        // 在组件创建时根据路由参数加载药品详情数据
        const medicineEntity = this.$route.params.name;
        this.fetchMedicineDetail(medicineEntity);
    },
    methods: {
        fetchMedicineDetail(entity) {
            fetch('/medical_ner_entities.json') // 从 public 目录中获取 JSON 文件
                .then(response => response.json())
                .then(data => {
                    const foundMedicine = data.annotations.find(medicine => medicine.entity === entity);
                    if (foundMedicine) {
                        this.medicine = foundMedicine;
                    } else {
                        console.error(`Medicine ${entity} not found.`);
                    }
                })
                .catch(error => {
                    console.error('Error fetching medicine data:', error);
                });
        },
        goBack() {
            // 使用 Vue Router 导航回 home 页面
            this.$router.push({ path: '/home' });
        }
    }
};
</script>

<style scoped>
.medicine-detail {
    padding: 20px;
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
</style>
