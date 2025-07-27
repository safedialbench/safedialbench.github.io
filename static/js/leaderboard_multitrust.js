function generateTable() {
    var data = score_table; // The variable from model_scores.js

    var table = '<table class="js-sort-table" id="results">';
    table += `<tr>
          <td class="js-sort-number"><strong>#</strong></td>
          <td class="js-sort"><strong>Model</strong></td>
          <td class="js-sort"><strong>Source</strong></td>
          <td class="js-sort-number"><strong><u>ASR</u></strong></td>
          <td class="js-sort-number"><strong>A.I</strong></td>
          <td class="js-sort-number"><strong>A.H</strong></td>
          <td class="js-sort-number"><strong>A.C</strong></td>
          <td class="js-sort-number"><strong>E.I</strong></td>
          <td class="js-sort-number"><strong>E.H</strong></td>
          <td class="js-sort-number"><strong>E.C</strong></td>
          <td class="js-sort-number"><strong>F.I</strong></td>
          <td class="js-sort-number"><strong>F.H</strong></td>
          <td class="js-sort-number"><strong>F.C</strong></td>
          <td class="js-sort-number"><strong>L.I</strong></td>
          <td class="js-sort-number"><strong>L.H</strong></td>
          <td class="js-sort-number"><strong>L.C</strong></td>
          <td class="js-sort-number"><strong>M.I</strong></td>
          <td class="js-sort-number"><strong>M.H</strong></td>
          <td class="js-sort-number"><strong>M.C</strong></td>
          <td class="js-sort-number"><strong>P.I</strong></td>
          <td class="js-sort-number"><strong>P.H</strong></td>
          <td class="js-sort-number"><strong>P.C</strong></td>
      </tr>`;

      // sort data to make sure the best model is on top
      // first_row = '-' // "Human Performance*"
      // console.log(data);

      // get all keys in data

    // 获取所有条目并转为数组
    var entries = Object.entries(data);

    // 排序
    entries.sort((a, b) => {
        const aASR = typeof a[1]['ASR'] === 'number' ? a[1]['ASR'] : -Infinity;
        const bASR = typeof b[1]['ASR'] === 'number' ? b[1]['ASR'] : -Infinity;
        return aASR - bASR;
    });

    var keys = Object.keys(data);
    console.log(keys)


      // for (var key in data) {
    for (var i=0; i<entries.length; i++) {
        var key = entries[i][0];
        console.log(key);
        var entry = entries[i][1];

        table += '<tr>';
        table += `<td>${i + 1}</td>`

        // for key = "1", "2", "3"
        top_tags = ['🥇', '🥈', '🥉']
        top_ranks = ["1", "2", "3"]
        if (top_ranks.includes(key)) {
            table += `<td><b class="best-score-text${entry.isNew ? ' new-model' : ''}">${entry.Model + top_tags[key - 1]}</b></td>`;
            table += `<td><a href="${entry.Source}" class="ext-link" style="font-size: 16px;">Link</a></td>`;
            table += `<td><b class="best-score-text">${entry['ASR'].toFixed(2).toString()}</b></td>`;
        } else {
            table += `<td><b class="${entry.isNew ? 'new-model' : ''}">${entry.Model}</b></td>`;
            table += `<td><a href="${entry.Source}" class="ext-link" style="font-size: 16px;">Link</a></td>`;
            table += `<td><b>${entry['ASR'].toFixed(2).toString()}</b></td>`;
        }        

        
        table += `<td>${entry['A.I'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['A.H'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['A.C'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['E.I'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['E.H'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['E.C'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['F.I'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['F.H'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['F.C'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['L.I'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['L.H'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['L.C'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['M.I'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['M.H'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['M.C'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['P.I'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['P.H'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['P.C'].toFixed(2).toString()}</td>`;
        table += '</tr>';
    }

    table += '</table>';
    document.getElementById('multitrust_leaderboard').innerHTML = table; // Assuming you have a div with id 'container' where the table will be placed
    if (typeof sortTable !== 'undefined' && typeof sortTable.init === 'function') {
        sortTable.init();
    }
}

// Call the function when the window loads
window.onload = generateTable;

// 确保所有HTML元素都已加载
document.addEventListener('DOMContentLoaded', function() {
    // 1. 获取需要的DOM元素
    const excelUpload = document.getElementById('excel-upload');
    const statusElement = document.getElementById('upload-status');
    
    // 2. 验证目标元素是否存在
    if (!excelUpload) {
        // 如果元素不存在，显示错误信息
        const errorMessage = '错误：未找到Excel上传元素';
        
        // 创建友好的用户提示
        const alertDiv = document.createElement('div');
        alertDiv.className = 'notification is-danger';
        alertDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i> ${errorMessage}
            <p>请检查以下情况：</p>
            <ul>
                <li>元素ID是否为"excel-upload"</li>
                <li>JavaScript是否在HTML元素之后加载</li>
                <li>是否存在语法错误</li>
            </ul>
        `;
        
        // 添加到容器
        const container = document.querySelector('.column.is-four-fifths');
        if (container) {
            container.prepend(alertDiv);
        }
        
        console.error(errorMessage);
        return;
    }
    
    // 3. 确保文件上传元素具有可访问性属性
    if (!excelUpload.hasAttribute('title')) {
        excelUpload.setAttribute('title', '上传Excel文件');
    }
    if (!excelUpload.hasAttribute('aria-label')) {
        excelUpload.setAttribute('aria-label', '选择Excel文件更新排行榜');
    }
    
    // 4. 设置按钮类型为"button"而非"submit"
    const uploadLabel = document.querySelector('label[for="excel-upload"]');
    if (uploadLabel && uploadLabel.matches('.button')) {
        uploadLabel.setAttribute('role', 'button');
    }

    // 5. 修复HTML语言属性（全局修复）
    if (!document.documentElement.hasAttribute('lang')) {
        document.documentElement.setAttribute('lang', 'zh-CN');
    }
    
    // 6. Excel上传处理逻辑
    excelUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        // 显示加载状态
        statusElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 正在解析Excel文件...';
        statusElement.className = 'upload-status';
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                // 解析Excel数据
                const newScoreTable = parseExcelToScoreTable(e.target.result);
                
                // 更新全局数据
                if (typeof score_table !== 'undefined') {
                    // 合并时自动递增key，避免覆盖
                    let maxKey = Math.max(...Object.keys(score_table).map(Number), 0);
                    for (const [k, v] of Object.entries(newScoreTable)) {
                        maxKey += 1;
                        score_table[String(maxKey)] = v;
                    }
                }
                
                // 重绘表格
                if (typeof generateTable === 'function') {
                    generateTable();
                    statusElement.innerHTML = '<span class="has-text-success"><i class="fas fa-check-circle"></i> 排行榜更新成功!</span>';
                    
                    // 2秒后清除状态
                    setTimeout(() => {
                        statusElement.innerHTML = '';
                    }, 2000);
                } else {
                    statusElement.innerHTML = '<span class="has-text-danger">错误: 未找到表格生成函数</span>';
                }
                
            } catch (error) {
                statusElement.innerHTML = `<span class="has-text-danger"><i class="fas fa-exclamation-triangle"></i> ${error.message}</span>`;
                console.error('Excel解析错误:', error);
            }
        };
        
        reader.onerror = function() {
            statusElement.innerHTML = '<span class="has-text-danger"><i class="fas fa-exclamation-triangle"></i> 文件读取失败</span>';
        };
        
        reader.readAsArrayBuffer(file);
    });
    
    // Excel解析辅助函数
    function parseExcelToScoreTable(data) {
        // 检查SheetJS库是否可用
        if (typeof XLSX === 'undefined') {
            throw new Error('SheetJS库未加载，无法解析Excel');
        }
        
        try {
            // 转换为Uint8Array
            const uint8Array = new Uint8Array(data);
            
            // 读取工作簿
            const workbook = XLSX.read(uint8Array, {type: 'array'});
            
            // 验证是否有工作表
            if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
                throw new Error('Excel文件中未包含工作表');
            }
            
            // 获取第一个工作表
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            
            // 转换为JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            
            // 验证数据
            if (!jsonData || jsonData.length === 0) {
                throw new Error('Excel中未找到有效数据');
            }

            // 必需字段列表
            const requiredFields = [
                'Model', 'Source', 'ASR', 'A.I', 'A.H', 'A.C', 'E.I', 'E.H', 'E.C',
                'F.I', 'F.H', 'F.C', 'L.I', 'L.H', 'L.C', 'M.I', 'M.H', 'M.C',
                'P.I', 'P.H', 'P.C'
            ];

            // 检查每一行是否包含所有必需字段
            jsonData.forEach((row, idx) => {
                requiredFields.forEach(field => {
                    if (!(field in row)) {
                        throw new Error(`第${idx + 2}行缺少字段：${field}`);
                    }
                });
            });
            
            // 创建新的score_table结构
            const newScoreTable = {};
            
            jsonData.forEach((row, index) => {
                const rowData = {};
                
                // 遍历每个字段
                for (const key in row) {
                    // 特殊处理分数字段
                    if (key === 'Model' || key === 'Source') {
                        rowData[key] = row[key];
                    } else {
                        // 尝试转换为数字
                        const value = parseFloat(row[key]);
                        rowData[key] = isNaN(value) ? row[key] : value;
                    }
                }
                rowData.isNew = true; // 标记为新数据
                
                // 添加排名数据
                newScoreTable[String(index + 1)] = rowData;
            });
            console.log('解析后的数据:', newScoreTable);
            return newScoreTable;
            
        } catch (error) {
            throw new Error(`Excel解析失败: ${error.message}`);
        }
    }
});