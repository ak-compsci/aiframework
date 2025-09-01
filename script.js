document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(item => {
                item.classList.remove('tab-active');
                item.classList.add('tab-inactive');
            });
            tab.classList.add('tab-active');
            tab.classList.remove('tab-inactive');

            const target = tab.getAttribute('data-tab');
            tabPanes.forEach(pane => {
                if (pane.id === `${target}-content`) {
                    pane.classList.remove('hidden');
                } else {
                    pane.classList.add('hidden');
                }
            });
        });
    });

    const stepperItems = document.querySelectorAll('.stepper-item');
    const stepperDetailContents = document.querySelectorAll('.stepper-detail-content');

    function activateStep(index) {
        stepperItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('stepper-item-active');
            } else {
                item.classList.remove('stepper-item-active');
            }
        });
        stepperDetailContents.forEach((content, i) => {
            if (i === index) {
                content.classList.remove('hidden');
            } else {
                content.classList.add('hidden');
            }
        });
    }

    stepperItems.forEach(item => {
        item.addEventListener('click', () => {
            activateStep(parseInt(item.dataset.index));
        });
    });
    
    activateStep(0);


    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.accordion-icon');
            content.classList.toggle('hidden');
            if (content.classList.contains('hidden')) {
                icon.textContent = '+';
                icon.classList.remove('rotate-45');
            } else {
                icon.textContent = '+';
                icon.classList.add('rotate-45');
            }
        });
    });
    
    const scaleLevels = document.querySelectorAll('.scale-level');
    const scaleDetailContents = document.querySelectorAll('.scale-detail-content');

    function activateScaleLevel(index) {
        scaleLevels.forEach((level, i) => {
            if (i === index) {
                level.classList.add('scale-level-active');
            } else {
                level.classList.remove('scale-level-active');
            }
        });
        scaleDetailContents.forEach((content, i) => {
            if (i === index) {
                content.classList.remove('hidden');
            } else {
                content.classList.add('hidden');
            }
        });
    }

    scaleLevels.forEach(level => {
        level.addEventListener('click', () => {
            activateScaleLevel(parseInt(level.dataset.index));
        });
    });

    activateScaleLevel(0);

});
