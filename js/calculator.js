// 啟動計算機
var initCalculator = function () {
    
    var operators = ['+', '-', 'x', '÷'];
    var decimalAdded = false;       // 用來記錄是否有按到小數點鍵
    
    $("#calculator span").click(function (e) {
            var input = $('.screen');   // 取得顯示框的元素
            var inputVal = input.html(); // 取得顯示框裡目前的文字內容
            var btnVal = $(this).html(); // 取得目前所按下的鍵為何
            var lastChar;

            // 如果按下的是C鍵,則清除顯示框的內容
            if (btnVal == 'C') {
                input.html("");
                decimalAdded = false;
            }

            // 如果按下的是=鍵,則記算結果
            else if (btnVal == '=') {
                var equation = inputVal;
                lastChar = equation[equation.length - 1];

                // 將x號改為*, ÷號改為/ (/g為全部替換之意)
                equation = equation.replace(/x/g, '*').replace(/÷/g, '/');

                // 檢查如果最後一個字是操作元,或是小數點,則把它移除
                // .$ 是正則表達式中找最後單一字元的意思
                if (operators.indexOf(lastChar) >= 0 || lastChar == '.')
                    equation = equation.replace(/.$/, '');
                // eval指令可以將字串中的內容作運算
                if (equation)
                    input.html(eval(equation));

                decimalAdded = false;
            }

            // 計算機的操作有三點注意事項
            // 1. 不可以有連續二個運算元出現
            // 2. 除了負號,一開始只能以數字開頭,不可以是操作元
            // 3. 不可以有連續二個小數點出現
            
            // 因此以下按下的鍵,必需做這些檢查

            // indexOf works only in IE9+
            // 如果按下的是操作元(+,-,x,÷)
            else if (operators.indexOf(btnVal) >= 0) {
                // 取得顯示框中的最後一個字元
                lastChar = inputVal[inputVal.length - 1];

                // 檢查二件事:
                // 1. 如果目前顯示框中不是空的,而且
                // 2. 最後一個字元不是操作元
                // 則將按鍵加入顯示框中
                if (inputVal != '' && operators.indexOf(lastChar) == -1)
                   input.html(input.html()+btnVal);

                // 如果目前顯示框中是空的,但按下的是負號,也允許加入顯示框
                else if (inputVal == '' && btnVal == '-')
                    input.html(input.html()+btnVal);

                // Replace the last operator (if exists) with the newly pressed operator
                // 如果最後一個己經是操作元,這時按的也是操作元,則將舊的操作元移除,設為新的操作元
                if (operators.indexOf(lastChar) >= 0 && inputVal.length > 1) {
                    // Here, '.' matches any character while $ denotes the end of string, 
                    // so anything (will be an operator in this case) at the end of string 
                    // will get replaced by new operator
                    input.html(inputVal.replace(/.$/, btnVal));
                }
                decimalAdded = false;
            }
            
            // 這裡是要檢查是否有連續二個小數點出現
            else if (btnVal == '.') {
                if (!decimalAdded) {
                    input.html(input.html()+btnVal);
                    decimalAdded = true;
                }
            }
            
            // if any other key is pressed, just append it
            // 這裡是剩下的按鍵(數字部份),直接加入顯示框中
            else {
                input.html(input.html()+btnVal);
            }

            // prevent page jumps
            e.preventDefault();
        });
};