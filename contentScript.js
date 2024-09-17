'use strict';

function simulateClick(element) {
    const event = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
    });
    element.dispatchEvent(event);
}

function startGame() {
    const startButton = document.querySelector('.Game_game__container__1I7MG .bn-svg');
    if (startButton) {
        console.log('Start button found, clicking to start the game...');
        simulateClick(startButton);
    } else {
        console.log('Start button not found.');
    }
}

function playGame() {
    const canvas = document.querySelector('.canvas-wrapper canvas');
    if (canvas) {
        console.log('Canvas found, simulating game play...');
        const interval = setInterval(() => {
            const rect = canvas.getBoundingClientRect();
            const x = rect.left + (rect.width / 2);
            const y = rect.top + (rect.height / 2);
            simulateClick(canvas);
            console.log('Clicking on canvas at position:', x, y);
        }, 1000);
    } else {
        console.log('Canvas not found.');
    }
}

function clickTaskTab() {
    const taskTab = Array.from(document.querySelectorAll('.components_container__tab__1mbN9')).find(tab => {
        return tab.innerText.includes('Nhiệm vụ');
    });

    if (taskTab) {
        console.log('Tab Nhiệm vụ được tìm thấy, đang click...');
        taskTab.click(); 
        return true;
    } else {
        console.log('Không tìm thấy tab Nhiệm vụ.');
        return false;
    }
}

function clickIncompleteTask() {
    const tasks = document.querySelectorAll('.Tasks_taskItem__16PwK');
    let foundIncompleteTask = false;
    for (const task of tasks) {
        const checkIcon = task.querySelector('img[src*="check.png"]');
        if (!checkIcon) {
            console.log('Nhiệm vụ chưa hoàn thành được tìm thấy, đang click...');
            task.click(); // Thực hiện click vào nhiệm vụ chưa hoàn thành
            foundIncompleteTask = true;
            break;
        }
    }
    return foundIncompleteTask;
}

function clickContinueButton() {
    const continueButton = document.querySelector('.DailyLogin_login__button__15aOK');
    if (continueButton) {
        console.log('Nút "Tiếp tục" được tìm thấy, đang click...');
        continueButton.click(); // Thực hiện click vào nút "Tiếp tục"
        return true;
    } else {
        console.log('Không tìm thấy nút "Tiếp tục".');
        return false;
    }
}

window.addEventListener('load', function() {
    if (document.readyState === 'complete') {
        // Thực hiện hàm click
        let clicked = false;
        const interval = setInterval(() => {
            clicked = clickTaskTab();
            if (clicked) {
                clearInterval(interval);
                const taskInterval = setInterval(() => {
                    const found = clickIncompleteTask();
                    if (!found) {
                        clearInterval(taskInterval);
                        console.log('Không tìm thấy nhiệm vụ chưa hoàn thành nào nữa.');
                    }
                }, 1000);
            }
        }, 1000);
        const continueInterval = setInterval(() => {
            const clickedContinue = clickContinueButton();
            if (clickedContinue) {
                clearInterval(continueInterval);
            }
        }, 1000);
    }
});
