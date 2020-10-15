let numbers = document.querySelectorAll('.number'),
    operations = document.querySelectorAll('.operator'),
    decimalBtn = document.getElementById('decimal'),
    clearBtns = document.querySelectorAll('.clear-btn'),
    // resultBtn = document.getElementById('result'),
    display = document.getElementById('display'),
    MemoryCurrentNumber = 0,
    MemoryNewNumber = false,
    MemoryPendingOperation = '',
    minusBtn = document.getElementById('minus'),
    checkMinus = false;

for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i];
    number.addEventListener('click', function(e) {
        numberPress(e.target.textContent);
        // console.log('Click number =' + e.target.textContent);
    });
}

for (let i = 0; i < operations.length; i++) {
    let operationBtn = operations[i];
    operationBtn.addEventListener('click', function(e) {
        operation(e.target.textContent);
    })
}

for (let i = 0; i < clearBtns.length; i++) {
    let clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function(e) {
        clear(e.srcElement.id);
    })
}

decimalBtn.addEventListener('click', decimal);

// resultBtn.addEventListener('click', result);

minusBtn.addEventListener('click', minus);

function numberPress(number) {
    // if (checkMinus == true) {
    //     if (MemoryNewNumber) {
    //         display.value = -number;
    //         MemoryNewNumber = false;
    //     } else {
    //         if (display.value === '0') {
    //             display.value = number;
    //         } else {
    //             display.value += number;
    //         }
    //     }
    //     checkMinus = false;
    // } else {
    if (MemoryNewNumber) {
        display.value = number;
        MemoryNewNumber = false;
    } else {
        if (display.value === '0') {
            display.value = number;
        } else {
            display.value += number;
        }
    }
    // }
    // console.log('Number OP = ' + MemoryPendingOperation);
    console.log('Number MemoryCurrentNumber = ' + MemoryCurrentNumber);
    console.log('Number MemoryNewNumber = ' + MemoryNewNumber);
    // console.log('');
};

function operation(op) {
    let localOperationMemory = +display.value;

    if (MemoryNewNumber === true && op === '√') {
        MemoryNewNumber = false;
    }
    if (MemoryNewNumber && MemoryPendingOperation !== '=' && MemoryPendingOperation !== '√') {
        display.value = MemoryCurrentNumber;
    } else {
        MemoryNewNumber = true;
        if (MemoryPendingOperation === '+') {
            MemoryCurrentNumber += localOperationMemory;
        } else if (MemoryPendingOperation === '-') {
            MemoryCurrentNumber -= localOperationMemory;
        } else if (MemoryPendingOperation === '*') {
            MemoryCurrentNumber *= localOperationMemory;
        } else if (MemoryPendingOperation === '/') {
            MemoryCurrentNumber /= localOperationMemory;
        } else if (MemoryPendingOperation === 'x^') {
            MemoryCurrentNumber = Math.pow(MemoryCurrentNumber, localOperationMemory);
        } else if (MemoryPendingOperation === '√') {
            if (MemoryCurrentNumber < 0) {
                alert('Невозможно возвести в корень');
                MemoryCurrentNumber = 0;
            } else {
                MemoryCurrentNumber = Math.round(Math.pow(localOperationMemory, 1 / 2)*100)/100;
            }
        } else {
            MemoryCurrentNumber = localOperationMemory;
        }

        if (-1 < MemoryCurrentNumber && MemoryCurrentNumber < 1) {
            MemoryCurrentNumber = Math.round(MemoryCurrentNumber * 100000) / 100000;
        }
        MemoryPendingOperation = op;
        display.value = MemoryCurrentNumber;
    }

    console.log('Operation OP = ' + MemoryPendingOperation);
    console.log('Operation MemoryCurrentNumber = ' + MemoryCurrentNumber);

    // MemoryCurrentNumber = MemoryPendingOperation === '+-' ? -MemoryCurrentNumber : MemoryCurrentNumber;


    console.log('Operation MemoryNewNumber = ' + MemoryNewNumber);
    console.log('Local memory = ' + localOperationMemory);
};

function decimal(params) {
    let localDecimalMemory = display.value;

    if (MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        }
    }
    // localDecimalMemory *= 100 / 100;
    // localDecimalMemory = parseFloat(localDecimalMemory);
    console.log(typeof localDecimalMemory);
    display.value = localDecimalMemory;
};

function minus(s) {
    let localMinusMemory = -display.value;
    // checkMinus = true;
    display.value = localMinusMemory;
    // console.log(MemoryCurrentNumber);
}

function clear(id) {
    if (id === 'ce') {
        display.value = '0';
        MemoryNewNumber = true;
    } else if (id === 'c') {
        display.value = '0';
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
    }
    // console.log('Operation OP = ' + MemoryPendingOperation);
    // console.log('Operation MemoryCurrentNumber = ' + MemoryCurrentNumber);
    // console.log('Operation MemoryNewNumber = ' + MemoryNewNumber);
    // console.log('');
};