
export function resetAnimation(){

    const countdownBar = document.querySelector('#countdown');
    
    // Remove and re-add the animation class to restart the animation
    countdownBar.classList.remove('countdown-bar');
    void countdownBar.offsetWidth; // Trigger reflow to ensure the animation restarts
    countdownBar.classList.add('countdown-bar');
}
