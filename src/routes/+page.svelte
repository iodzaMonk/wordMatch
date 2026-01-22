<script>
    const hskLevels = [1, 2, 3, 4, 5, 6];
</script>

<h1 class="font-['Cinzel_Decorative'] text-transparent bg-clip-text bg-linear-to-b from-emerald-100 to-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.4)] tracking-[0.2em] uppercase text-6xl mb-8 text-center">
    Select a mode
</h1>
<div class="flex flex-col gap-5">
    <div class="flex gap-5">

        {#each hskLevels as lvl }

               <a href={`normal?lvl=${lvl}`} class=" border glass-surface text-white font-serif tracking-widest py-5 px-10 rounded-full shadow-2xl shadow-black/50 transition-all duration-300 hover:scale-105 active:scale-95 text-4xl lowercase italic backdrop-blur-sm">
        HSK{lvl}
    </a> 
        {/each}
    </div>
    <a href="/infinity" class="bg-emerald-900/80 border border-emerald-800 text-emerald-100 font-serif tracking-widest py-5 px-10 rounded-full shadow-2xl shadow-black/50 transition-all duration-300 hover:scale-105 hover:bg-emerald-800 active:scale-95 text-4xl lowercase italic backdrop-blur-sm">
       infinity 
    </a>
</div>