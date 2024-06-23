<template>
    <div class="search-page">
        <h1 class="search-title">搜索页面</h1>
        <input type="text" v-model="query" @input="performSearch" placeholder="输入搜索关键词..." class="search-input" />
        <div v-if="!query && searchHistory.length > 0" class="search-history">
            <h2>搜索历史：</h2>
            <ul>
                <li v-for="historyItem in searchHistory" :key="historyItem" class="history-item">
                    <button @click="searchFromHistory(historyItem)">{{ historyItem }}</button>
                </li>
            </ul>
        </div>
        <div v-else-if="results.length" class="results-list">
            <div v-for="result in results" :key="result.id" class="result-item">
                <h3>{{ result.text }}</h3>
                <ul>
                    <li v-for="(annotation, index) in result.annotations" :key="index">
                        <strong>{{ annotation.Q }}</strong> - {{ annotation.A }}
                    </li>
                </ul>
            </div>
        </div>
        <div v-else class="no-results">
            <p>未找到相关结果。</p>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
    name: 'SearchPage',
    setup() {
        const query = ref('') // 搜索关键词
        const results = ref([]) // 搜索结果
        const searchHistory = ref([]) // 搜索历史

        onMounted(() => {
            // 加载搜索历史（假设从本地存储或其他数据源加载）
            loadSearchHistory()
        })

        const loadSearchHistory = () => {
            // 模拟加载搜索历史的过程
            searchHistory.value = [
                '中医',
                '灸法',
                '针灸',
                '经络'
            ]
        }

        const performSearch = async () => {
            if (!query.value.trim()) {
                // 如果搜索框为空，显示搜索历史
                results.value = []
                return
            }

            try {
                const response = await fetch('/train.json') // 加载 JSON 数据
                const data = await response.json()

                // 使用关键词过滤数据
                const keyword = query.value.toLowerCase()
                results.value = data.filter(item =>
                    item.text.toLowerCase().includes(keyword) ||
                    item.annotations.some(annotation =>
                        annotation.Q.toLowerCase().includes(keyword) ||
                        annotation.A.toLowerCase().includes(keyword)
                    )
                )

                // 更新搜索历史（假设将搜索关键词添加到搜索历史中）
                if (!searchHistory.value.includes(query.value.trim())) {
                    searchHistory.value.push(query.value.trim())
                }
            } catch (error) {
                console.error('Failed to load or search data:', error)
            }
        }

        const searchFromHistory = (historyItem) => {
            query.value = historyItem
            performSearch()
        }

        return {
            query,
            results,
            searchHistory,
            performSearch,
            searchFromHistory
        }
    }
}
</script>

<style scoped>
.search-page {
    padding: 20px;
    max-width: 800px;
    height: 844px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
    /* background-color: #9f9564; */
    background: linear-gradient(to bottom, #efd998 1%, #fdfdfd 99%);
}

.search-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
    color: #2c3e50;
}

.search-input {
    width: 100%;
    padding: 10px;
    font-size: 18px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.search-history {
    margin-top: 20px;
}

.history-item {
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
}

.results-list {
    margin-top: 20px;
}

.result-item {
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.result-item h3 {
    margin: 0 0 10px;
    color: #2c3e50;
}

.result-item ul {
    list-style-type: none;
    padding: 0;
}

.result-item li {
    margin-bottom: 10px;
}

.result-item strong {
    color: #3498db;
}

.no-results {
    text-align: center;
    color: #999;
    font-size: 18px;
}
</style>
