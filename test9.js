
        // DOM Elements
        const toggles = document.querySelectorAll('.policy-toggle');
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');
        const hudThreat = document.getElementById('hud-threat');
        const hudIntegrity = document.getElementById('hud-integrity');
        const navStatus = document.getElementById('nav-status');
        
        const coreServer = document.getElementById('core-server');
        const coreIcon = document.getElementById('core-icon');
        const coreText = document.getElementById('core-text');
        const attackLayer = document.getElementById('attack-layer');

        // Shields
        const shieldA9 = document.getElementById('shield-a9');
        const shieldA10 = document.getElementById('shield-a10');
        const shieldA16 = document.getElementById('shield-a16');
        const backupServer = document.getElementById('backup-server');

        function updateSystem() {
            let score = 0;
            
            // Calculate Score
            toggles.forEach(t => {
                if(t.checked) score += parseInt(t.dataset.val);
            });

            // Update Metrics UI
            progressBar.style.width = `${score}%`;
            progressText.innerText = `${score}%`;
            hudIntegrity.innerText = `${score}%`;

            // Color logic
            const elementsToColor = [progressBar, progressText, hudIntegrity];
            
            elementsToColor.forEach(el => {
                el.classList.remove('bg-red-500', 'bg-amber-500', 'bg-emerald-500', 'text-red-500', 'text-amber-500', 'text-emerald-500', 'shadow-[0_0_10px_#ef4444]', 'shadow-[0_0_10px_#f59e0b]', 'shadow-[0_0_10px_#10b981]', 'glow-text-red', 'glow-text-emerald');
            });

            if(score < 50) {
                progressBar.classList.add('bg-red-500', 'shadow-[0_0_10px_#ef4444]');
                progressText.classList.add('text-red-500');
                hudIntegrity.classList.add('text-red-500', 'glow-text-red');
                hudThreat.innerText = "EXTREME"; hudThreat.className = "text-red-500 font-bold glow-text-red";
                navStatus.innerText = "CRITICAL_THREAT"; navStatus.className = "text-red-500 animate-pulse";
            } else if(score < 100) {
                progressBar.classList.add('bg-amber-500', 'shadow-[0_0_10px_#f59e0b]');
                progressText.classList.add('text-amber-500');
                hudIntegrity.classList.add('text-amber-500');
                hudThreat.innerText = "ELEVATED"; hudThreat.className = "text-amber-500 font-bold";
                navStatus.innerText = "DEFENSES_ACTIVE"; navStatus.className = "text-amber-500";
            } else {
                progressBar.classList.add('bg-emerald-500', 'shadow-[0_0_10px_#10b981]');
                progressText.classList.add('text-emerald-500');
                hudIntegrity.classList.add('text-emerald-500', 'glow-text-emerald');
                hudThreat.innerText = "SECURE (ISO COMPLIANT)"; hudThreat.className = "text-emerald-500 font-bold glow-text-emerald";
                navStatus.innerText = "SYSTEM_OPTIMAL"; navStatus.className = "text-emerald-500";
            }

            // Visual Simulation Logic (The WOW Factor)
            
            // A.9 Access Control
            if(document.getElementById('toggle-a9').checked) {
                shieldA9.classList.add('active');
                attackLayer.classList.add('blocked'); // Lasers disappear
            } else {
                shieldA9.classList.remove('active');
                attackLayer.classList.remove('blocked');
            }

            // A.16 SIEM
            if(document.getElementById('toggle-a16').checked) {
                shieldA16.classList.add('active');
            } else {
                shieldA16.classList.remove('active');
            }

            // A.10 Crypto
            if(document.getElementById('toggle-a10').checked) {
                shieldA10.classList.add('active');
            } else {
                shieldA10.classList.remove('active');
            }

            // A.17 Continuity
            if(document.getElementById('toggle-a17').checked) {
                backupServer.classList.remove('opacity-0', 'translate-x-10');
                backupServer.classList.add('opacity-100', 'translate-x-0');
            } else {
                backupServer.classList.add('opacity-0', 'translate-x-10');
                backupServer.classList.remove('opacity-100', 'translate-x-0');
            }

            // Core Status
            if(score === 100) {
                coreServer.classList.remove('vulnerable');
                coreServer.classList.add('secured');
                coreIcon.className = "fa-solid fa-server text-4xl text-emerald-400 mb-1";
                coreText.innerText = "SECURED";
                coreText.className = "text-[9px] font-bold text-emerald-400 tracking-wider";
            } else {
                coreServer.classList.add('vulnerable');
                coreServer.classList.remove('secured');
                coreIcon.className = "fa-solid fa-server text-4xl text-red-500 mb-1";
                coreText.innerText = "VULNERABLE";
                coreText.className = "text-[9px] font-bold text-red-500 tracking-wider";
            }
        }

        // Add Listeners
        toggles.forEach(t => t.addEventListener('change', updateSystem));
        
        // Initial setup
        updateSystem();

    