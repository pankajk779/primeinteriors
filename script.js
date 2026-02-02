        // js script for home_page

        const imageSliderExtendedTime = 10000;
        const imageSliderNormalTime = 4000;
        let imageSliderTime = 0;
        let animateBackwards = false;
        let slideIndex = 0;
        let visibleImagePosition = -1;
        let then = Date.now();
        let isAnimationInit = false;
        let isTextAnimationInit = false;
        let animationTacker = 0;
        let isAnimationRunning = false;
        let slides = null;
        let textBoxes = null;
        let upcomingImagePosition = -1;
        let fadeInOpacity = -1.0;
        let fadeOutOpacity = -1.0;
        let fadeInTextOpacity = -1.0;
        let fadeOutTextOpacity = -1.0;
        let autoAnimate = false;

        let upcomingImageX = 0;
        let currentImageX = 0;
        let upcomingTextX = 0;
        let currentTextX = 0;
        
        let framesNumber = 0;

        initViews();
        startAnimationTimer();

        function initViews(){
                
                autoAnimate = true;
                animateBackwards = false;
                imageSliderTime = imageSliderNormalTime;
                slides = document.getElementsByClassName("img");
                textBoxes = document.getElementsByClassName("img_text_box");
                visibleImagePosition = 0;
                slides[visibleImagePosition].style.display = "inline";
                slides[visibleImagePosition].style.opacity = "1.0";
                
                textBoxes[visibleImagePosition].style.display = "inline";
                textBoxes[visibleImagePosition].style.opacity = "1.0";
                
                //adding event listeners to imageSliderButtons
                document.getElementById("next_btn").addEventListener("click", onButtonClickShowNextImage);
                document.getElementById("previous_btn").addEventListener("click", onButtonClickShowPreviousImage);
        }

        function startAnimationTimer(){
                
                fpsInterval = 16;               /*60fps*/
                requestAnimationFrame(startSlider);
        }


        /** magic function to load animation of image sliders   **/
        function startSlider(){
                
                if(isAnimationRunning){
                        if(Date.now() - then < 500){
                                /* animation is running */
                                
                                if(animateBackwards){
                                        
                                        initBackwardAnimation();
                                        if(Date.now() - then > 200){
                                                backwardImageAnimation();
                                        }
                                        backwardTextAnimation();
                                        
                                }else{
                                        
                                        initForwardAnimation();
                                        if(Date.now() - then > 200){
                                                forwardImageAnimation();
                                        }
                                        forwardTextAnimation();
                                }
                                
                                requestAnimationFrame(startSlider);
                                return;
                        }
                        clearEverything();
                        return;
                        
                }else{
                        
                        if(Date.now() - then >= imageSliderTime){
                                
                                isAnimationRunning = true;
                                then = Date.now();
                                animationTracker = Date.now();
                                isAnimationInit = false;
                                isTextAnimationInit = false;
                                animateBackwards = false;
                                console.log(animateBackwards);
                                
                                //making timer again to 4000ms(normalTime) after one cycle of extended time
                                if(imageSliderTime == imageSliderExtendedTime){
                                        imageSliderTime = imageSliderNormalTime;
                                }
                        }
                        
                        if(autoAnimate){
                                 requestAnimationFrame(startSlider);
                        }
                }
        }
        
        function initForwardAnimation(){
                if(isAnimationInit){
                        return;
                }
                
                currentImageX= 0;
                upcomingImageX = 50;
                currentTextX = 0;
                upcomingTextX = 200;
                
                upcomingImagePosition = getNextImage(visibleImagePosition);
                slides[upcomingImagePosition].style.display = "inline";
                slides[upcomingImagePosition].style.opacity = 0.0;
                slides[upcomingImagePosition].getBoundingClientRect().x =upcomingImageX;
                
                
                textBoxes[upcomingImagePosition].style.display = "inline";
                textBoxes[upcomingImagePosition].style.opacity = 0.0;
                
                isTextAnimationInit = true;
                isAnimationInit = true;
        }

        function forwardImageAnimation(){

                /**     update opacity  **/
                if(parseFloat(slides[visibleImagePosition].style.opacity) - 0.07 >=0.0){
                        fadeOutOpacity = (parseFloat(slides[visibleImagePosition].style.opacity) - 0.07).toFixed(2);
                        slides[visibleImagePosition].style.opacity = fadeOutOpacity;
                }else{
                        slides[visibleImagePosition].style.opacity = 0.0;
                }
                                
                if(parseFloat(slides[upcomingImagePosition].style.opacity) + 0.07 <= 1.0){
                        fadeInOpacity = (parseFloat(slides[upcomingImagePosition].style.opacity) + 0.07).toFixed(2);
                        slides[upcomingImagePosition].style.opacity = fadeInOpacity;
                }else{
                        slides[upcomingImagePosition].style.opacity = 1.0;
                }
                                
                                
                /**     update upcoming and visible IMAGE style.left position -->     **/
                if(currentImageX - 4 >= -50){
                        currentImageX = currentImageX - 4;
                        slides[visibleImagePosition].style.left = currentImageX.toFixed(2) + "px";
                }else{
                        slides[visibleImagePosition].style.left = -50 + "px";
                }
                      
                if(upcomingImageX - 4 >= 0){
                       upcomingImageX =upcomingImageX - 4;
                        slides[upcomingImagePosition].style.left =upcomingImageX.toFixed(2) + "px";
                }else{
                        slides[upcomingImagePosition].style.left = 0 + "px";
                }
                
                
        }
        
        function forwardTextAnimation(){
                
                
                /** update opacity**/
                if(parseFloat(textBoxes[visibleImagePosition].style.opacity) - 0.15 >=0.0){
                        fadeOutOpacity = (parseFloat(textBoxes[visibleImagePosition].style.opacity) - 0.15).toFixed(2);
                        textBoxes[visibleImagePosition].style.opacity = fadeOutOpacity;
                }else{
                        textBoxes[visibleImagePosition].style.opacity = 0.0;
                }
                                
                if(parseFloat(textBoxes[upcomingImagePosition].style.opacity) + 0.07 <= 1.0){
                        fadeInOpacity = (parseFloat(textBoxes[upcomingImagePosition].style.opacity) + 0.07).toFixed(2);
                        textBoxes[upcomingImagePosition].style.opacity = fadeInOpacity;
                }else{
                        textBoxes[upcomingImagePosition].style.opacity = 1.0;
                }
                
                
                
                /**     update upcoming text and visible TEXT style.left position        **/
                if(currentTextX - 9 >= -200){
                        currentTextX = currentTextX - 9;
                        textBoxes[visibleImagePosition].style.left = currentTextX.toFixed(2) + "px";
                }else{
                        textBoxes[visibleImagePosition].style.left = -200 + "px";
                }
                
                if(upcomingTextX - 9 >= 0){
                       upcomingTextX = upcomingTextX - 9;
                        textBoxes[upcomingImagePosition].style.left = upcomingTextX.toFixed(2) + "px";
                }else{
                        textBoxes[upcomingImagePosition].style.left = 0 + "px";
                }
                
                
        }
        
        function initBackwardAnimation(){
                
                if(isAnimationInit){
                        return;
                }
                
                currentImageX = 0;
                upcomingImageX = -50;
                currentTextX = 0;
                upcomingTextX = -200;
                
                fadeOutTextOpacity = 1;
                fadeInTextOpacity = 0;
                
                upcomingImagePosition = getNextImage(visibleImagePosition);
                slides[upcomingImagePosition].style.display = "inline";
                slides[upcomingImagePosition].style.opacity = 0.0;
                slides[upcomingImagePosition].style.left = -50;
                
                textBoxes[upcomingImagePosition].style.display = "inline";
                textBoxes[upcomingImagePosition].style.opacity = 0.0;
                textBoxes[upcomingImagePosition].style.left = -200;
                
                isAnimationInit = true;
        }

        function backwardImageAnimation(){
                
                
                //update opacity
                if(parseFloat(slides[visibleImagePosition].style.opacity) - 0.07 >=0.0){
                        fadeOutOpacity = (parseFloat(slides[visibleImagePosition].style.opacity) - 0.07).toFixed(2);
                        slides[visibleImagePosition].style.opacity = fadeOutOpacity;
                }else{
                        slides[visibleImagePosition].style.opacity = 0.0;
                }
                                
                if(parseFloat(slides[upcomingImagePosition].style.opacity) + 0.07 <= 1.0){
                        fadeInOpacity = (parseFloat(slides[upcomingImagePosition].style.opacity) + 0.07).toFixed(2);
                        slides[upcomingImagePosition].style.opacity = fadeInOpacity;
                }else{
                        slides[upcomingImagePosition].style.opacity = 1.0;
                }
                
                //update current IMAGE and current IMAGE style.left position
                if(currentImageX + 4 <= 50){
                        currentImageX = currentImageX + 4;
                        slides[visibleImagePosition].style.left = currentImageX.toFixed(2) + "px";
                }else{
                        slides[visibleImagePosition].style.left = 50 + "px";
                }
                if(upcomingImageX + 4 <= 0){
                       upcomingImageX =upcomingImageX + 4;
                        slides[upcomingImagePosition].style.left =upcomingImageX.toFixed(2) + "px";
                }else{
                        slides[upcomingImagePosition].style.left = 0 + "px";
                }
                
        }
        
        function backwardTextAnimation(){
                
                
                //update opacity
                console.log("visibleTextOpacity = " + textBoxes[visibleImagePosition].style.opacity);
                if(parseFloat(textBoxes[visibleImagePosition].style.opacity) - 0.02 >= 0.0){
                        fadeOutTextOpacity = (parseFloat(textBoxes[visibleImagePosition].style.opacity) - 0.02).toFixed(2);
                        textBoxes[visibleImagePosition].style.opacity = fadeOutTextOpacity;
                }else{
                        textBoxes[visibleImagePosition].style.opacity = 0.0;
                }
                                
                if(parseFloat(textBoxes[upcomingImagePosition].style.opacity) + 0.02 <= 1.0){
                        fadeInTextOpacity = (parseFloat(textBoxes[upcomingImagePosition].style.opacity) + 0.02).toFixed(2);
                        textBoxes[upcomingImagePosition].style.opacity = fadeInTextOpacity;
                }else{
                        textBoxes[upcomingImagePosition].style.opacity = 1.0;
                }
                
                //update current TEXT and upcoming TEXT style.left position
                 if(parseFloat(textBoxes[visibleImagePosition].style.left)  + 4 <= 200){
                        currentTextX = parseFloat(textBoxes[visibleImagePosition].style.left)  + 4;
                        textBoxes[visibleImagePosition].style.left = (currentTextX).toFixed(2) + "px";
                }else{
                        textBoxes[visibleImagePosition].style.left = 200 + "px";
                }
                
                if(parseFloat(textBoxes[upcomingImagePosition].style.left) + 4 <= 0){
                        upcomingTextX = parseFloat(textBoxes[upcomingImagePosition].style.left) + 4;
                        textBoxes[upcomingImagePosition].style.left = (upcomingTextX).toFixed(2) + "px";
                }else{
                        textBoxes[upcomingImagePosition].style.left = 0 + "px";
                }
        }

        function onButtonClickShowPreviousImage(){
                
                animateBackwards = true;
                //imageSliderTime = imageSliderExtendedTime;
                isAnimationRunning = true;
                then = Date.now();
                isAnimationInit = false;
                requestAnimationFrame(startSlider);
        }

        function onButtonClickShowNextImage(){
                
                animateBackwards = false;
                isAnimationRunning = true;
                then = Date.now();
                isAnimationInit = false;
                requestAnimationFrame(startSlider);
        }

        function getNextImage(currentImage){
                
                if(animateBackwards){
                        if(--currentImage < 0){
                        return slides.length-1;
                        }else return currentImage--;
                        
                }else{
                        if(currentImage++ >= slides.length-1){
                        return 0;
                        }else return currentImage++;
                }
        }


        /**     clear everything for next animation     **/
        function clearEverything(){
                
                framesCount = 0;
                then = Date.now();
                isAnimationRunning = false;
                fadeInOpacity = 0.0;
                fadeOutOpacity = 1.0;
                fadeInTextOpacity = 0.0;
                fadeOutTextOpacity = 1.0;
                
                slides[visibleImagePosition].style.display = "none";
                textBoxes[visibleImagePosition].style.display = "none";
                
                visibleImagePosition = upcomingImagePosition;
                
                requestAnimationFrame(startSlider);
        }




