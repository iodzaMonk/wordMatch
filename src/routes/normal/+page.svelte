<script lang="ts">
    import type { Difficulty } from "$lib/types/difficulty.type";
    import type {PageData} from './$types';
    import Game from "$lib/components/Game.svelte";
    import {invalidateAll} from '$app/navigation';

    let {data}: {data: PageData} = $props();
    let propData = $derived(data);


	const difficulties = [
		{ label: 'easy', color: 'emerald', time: 20, words: 10},
		{ label: 'medium', color: 'amber', time: 15, words: 15},
		{ label: 'hard', color: 'red', time: 10, words: 20},
		{ label: 'extreme', color: 'fuchsia', time: 5, words: 30}
	];

    let difficulty = $state<Difficulty | null>(null);
    let phase = $state('selection');

    const handleSelect = (item: Difficulty) => {
        if (difficulty && item.label === difficulty.label) {
            difficulty = null;
            return
        }
        difficulty = item;
    }
</script>

{#if phase === 'selection'}
<div class="flex flex-col gap-5 mt-40 h-4/5">
    <h1 class="font-['Cinzel_Decorative'] text-transparent bg-clip-text bg-linear-to-b from-emerald-100 to-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.4)] tracking-[0.2em] uppercase text-6xl mb-8 text-center">
        Select a mode
    </h1>
    <div class="flex gap-5">
        {#each difficulties as item}
            <button 
                onclick={() => handleSelect(item)}
                class="{difficulty?.label === item.label ? `bg-${item.color}-900 shadow-[0_0_20px_rgba(0,0,0,0.5)] shadow-${item.color}-500/30 scale-105` : `glass-surface bg-${item.color}-900/20 hover:bg-${item.color}-900/40`} border-{item.color}-800 text-{item.color}-100 border font-serif tracking-widest py-5 px-10 rounded-full transition-all duration-300 active:scale-95 text-4xl lowercase italic text-white"
            >
                {item.label}
            </button>
        {/each}
    </div>

        {#if difficulty}
            <div class="flex justify-center gap-8 mt-12">
                <!-- Time Card -->
                <div class="flex flex-col items-center bg-emerald-950/40 backdrop-blur-md p-6 rounded-2xl border border-emerald-500/20 shadow-lg shadow-black/20 min-w-[150px] transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
                    <h2 class="text-emerald-300/60 text-sm uppercase tracking-[0.25em] mb-2 font-serif border-b border-emerald-500/20 pb-1">Time</h2>
                    <p class="font-['Cinzel_Decorative'] text-5xl text-emerald-100 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">
                        {difficulty.time}<span class="text-xl">s</span>
                    </p>
                </div>

                <!-- Words Card -->
                <div class="flex flex-col items-center bg-emerald-950/40 backdrop-blur-md p-6 rounded-2xl border border-emerald-500/20 shadow-lg shadow-black/20 min-w-37.5 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 delay-100">
                    <h2 class="text-emerald-300/60 text-sm uppercase tracking-[0.25em] mb-2 font-serif border-b border-emerald-500/20 pb-1">Words</h2>
                    <p class="font-['Cinzel_Decorative'] text-5xl text-emerald-100 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">
                        {difficulty.words}
                    </p>
                </div>
            </div>
            <button 
                class="
                    mt-12 px-16 py-6 
                    bg-linear-to-b from-emerald-800 to-emerald-950 
                    border border-emerald-500/30 
                    text-emerald-50 font-['Cinzel_Decorative'] text-4xl uppercase tracking-[0.25em] 
                    rounded-full 
                    transition-all duration-500 
                    hover:scale-105 hover:border-emerald-400 
                    active:scale-95 active:duration-100 
                    cursor-pointer 
                    animate-in fade-in slide-in-from-bottom-8
                "
                onclick={() => phase = 'playing'}
            >
                Enter
            </button>
        {/if}


    <div class="hidden bg-emerald-900 bg-amber-900 bg-red-900 bg-fuchsia-900 bg-emerald-900/20 bg-amber-900/20 bg-red-900/20 bg-fuchsia-900/20 bg-emerald-900/40 bg-amber-900/40 bg-red-900/40 bg-fuchsia-900/40 shadow-emerald-500/30 shadow-amber-500/30 shadow-red-500/30 shadow-fuchsia-500/30 border-emerald-800 border-amber-800 border-red-800 border-fuchsia-800"></div>
</div>
{:else if phase === 'playing' || phase === 'end'}
    <Game target={propData.word} options={propData.options} onnext={() => invalidateAll()} difficulty={difficulty as Difficulty} bind:phase={phase}/>

{/if}