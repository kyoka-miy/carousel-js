'use strict';

{
    const next = document.getElementById('next');
    const prev = document.getElementById('prev');
    const ul = document.querySelector('ul');
    const slides = ul.children;
    const dots = [];
    let currentIndex = 0;

    function updateButtons() {
        next.classList.remove('hidden');
        prev.classList.remove('hidden');

        if(currentIndex === 0){
            prev.classList.add('hidden');
        }
        if(currentIndex === slides.length-1){
            next.classList.add('hidden');
        }
    }
    function moveSlides() {
        const slideWidth = slides[0].getBoundingClientRect().width;
        ul.style.transform = `translateX(${-1 * slideWidth * currentIndex}px)`;
    }

    // ボタンを動的に生成する
    function setupDots(){
        // スライドの長さごとに
        for (let i = 0; i  < slides.length; i++) {
            // スライドの数だけボタン要素を作る
            const button = document.createElement('button');

            button.addEventListener('click', ()=> {
                // iにはクリックされたスライドの順が入る
                currentIndex = i;
                
                updateDots();
                moveSlides();
                updateButtons();
            });


            dots.push(button);
            document.querySelector('nav').appendChild(button);
        }
        // dotsの配列にbuttonを入れたのはcurrentクラスをつけるため
        dots[0].classList.add('current');
    }
    function updateDots(){
        dots.forEach(dot => {
            dot.classList.remove('current');
        });
        dots[currentIndex].classList.add('current');
    }

    updateButtons();
    setupDots();

    next.addEventListener('click', ()=> {
        // クリックされるごとにcurrentIndexが1増える
        currentIndex++;
        updateButtons();
        moveSlides();
        updateDots();
    });
    prev.addEventListener('click', ()=> {
        // クリックされるごとにcurrentIndexが1減る
        currentIndex--;
        updateButtons();
        moveSlides();
        updateDots();
    });

    window.addEventListener('resize', ()=> {
        moveSlides();
    });
}