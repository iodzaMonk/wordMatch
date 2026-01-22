<script lang="ts">
    import type {Word} from '$lib/types/word.type';
    import type {Difficulty} from '$lib/types/difficulty.type';
    import {Tween} from 'svelte/motion';
    let {target, options, onnext, difficulty, phase = $bindable()}: {target: Word, options: Word[], onnext: () => void, difficulty: Difficulty, phase: string} = $props();
    let selected = $state.raw<Word | null>(null);
    let score = $state(0);
    let correctWords = $state(0);
    let timeoutAns = $state<NodeJS.Timeout>();
    let validating = $state(false);
    const timer = new Tween(100, {
        duration: 5000,
        easing: (t) => t
    })
    let shuffled = $derived.by(() => {
        let arr = [target, ...options];
        let ran = [];
        while (arr.length > 0) {
            const element = arr[Math.floor(Math.random() * arr.length)];
            arr = arr.filter((el) => el.character != element.character);
            ran.push(element);
        }
        return ran;
    })

    function handleAnswer(chosen: Word) {
        if (phase === 'wait' || phase === 'end') return;
        try {
            selected = chosen;
            if (chosen.character === target.character) {
                score = score + 1;
                correctWords = correctWords + 1;
                validating = true;
                phase = "wait";
                if (score >= difficulty.words) phase = "end";
                timer.set(timer.current, {duration: 0}); return;
            } else {
                score = 0;
                phase = "wait";
            }
        } catch (e) {
            console.error(e);
        }
    }

    $effect(() => {
        if (phase === "end" || phase === "wait") {
            timer.set(timer.current, {duration: 0}); return;
        }
        target;
        validating = false;
        selected = null;
        timer.set(100, {duration: 0});

        timer.set(0, {duration: difficulty.time*1000});
        const timeoutId = setTimeout(() => {
            if (!validating) {
                score = 0;
            }
            phase = 'wait';
            timer.set(timer.current, {duration: 0}); return;
        }, difficulty.time*1000);

        return () => {
            clearTimeout(timeoutId);
            clearTimeout(timeoutAns);
        }
    })


    function restart() {
        phase = "playing";
    }

    function menu() {
        phase = "selection";
    }

    function next() {
        phase = "playing";
        onnext();
    }
</script>


{#if phase === 'end'}
    <div class="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-black/60 backdrop-blur-md animate-in fade-in duration-500">
        
        <h2 class="text-7xl font-serif italic mb-4 text-white">Game Over</h2>
        
        <div class="flex gap-6 text-white">
            <button onclick={menu} class="px-10 py-5 bg-emerald-950/40 border border-emerald-500/30 rounded-full hover:bg-emerald-900/80 transition-all">
                Go back to menu
            </button>
            <button onclick={restart} class="px-10 py-5 bg-red-950/40 border border-red-500/30 rounded-full hover:bg-red-900/80 transition-all">
                Restart
            </button>
        </div>
        
    </div>
{/if}
<div class="text-white flex flex-col gap-5 items-center w-full">
<div class="h-2 w-4/5 bg-white/10 rounded-full overflow-hidden">
    {#if phase !== "wait"}
        <div 
            class="h-full bg-white " 
            style:width="{timer.current}%"
        ></div>
    {/if}
</div>
    <div class="text-7xl relative flex flex-col items-center w-full mb-10">{target.character}
            {#if phase === 'wait'}
        <p class="text-xl absolute inset-0 top-full left-1/2 z-10 w-fit -translate-x-1/2">{target.definition}</p> 
    {/if}
    </div>
    <div class:easy={difficulty.label === "easy"}
         class:medium={difficulty.label === "medium"}
         class:hard={difficulty.label === "hard"}
         class:extreme={difficulty.label === "extreme"}
         class="text-white text-6xl italic font-serif absolute top-20 left-20">{difficulty.label}</div>
    <div class="text-white text-6xl absolute top-20 right-20">{score}/{difficulty.words}</div>
        <div class="flex flex-col gap-10 relative text-2xl">
            <div class="flex gap-5">
            {#each shuffled as option (option.character)}
                    <button 
                    disabled={phase === "end" || phase === "wait"}
                    onclick={() => handleAnswer(option)}
                    class="bg-emerald-900/20 scale-105 border-emerald-800 text-emerlad-100 border font-serif tracking-widest py-5 px-10 rounded-full transition-all duration-300 active:scale-95 lowercase italic cursor-pointer"
                    class:correct-style={phase === "wait" && option.character === target.character}
                    class:wrong-style={selected=== option && option.character !== target.character}
                    >{option.pinyin}</button>
            {/each}
        </div>
        {#if phase === "wait"}
            <button onclick={next} class="px-10 absolute h-fit py-5 inset-0 top-40 bg-emerald-950/40 border border-emerald-500/30 rounded-full hover:bg-emerald-900/80 transition-all">
                Next
            </button>
        {/if}
    </div>
</div>