        // 画像データ
        const images = [
            {
                src: './assets/img/1.png',
            },
            {
                src: './assets/img/2.png',
            },
            {
                src: './assets/img/3.png',
            },
            {
                src: './assets/img/4.png',
            },
            {
                src: './assets/img/5.png',
            },
            {
                src: './assets/img/6.png',
            },
            {
                src: './assets/img/7.png',
            },
            {
                src: './assets/img/8.png',
            },
            {
                src: './assets/img/9.png',
            },
            {
                src: './assets/img/10.png',
            },
            {
                src: './assets/img/11.png',
            },
            {
                src: './assets/img/12.png',
            },
            {
                src: './assets/img/13.png',
            },
            {
                src: './assets/img/14.png',
            },
            {
                src: './assets/img/15.png',
            },
            {
                src: './assets/img/16.png',
            },
            {
                src: './assets/img/17.png',
            },
            {
                src: './assets/img/18.png',
            },
            {
                src: './assets/img/19.png',
            },
            {
                src: './assets/img/20.png',
            },

        ];

        const gallery = document.getElementById('gallery');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        const closeBtn = document.getElementById('closeBtn');
        const cursorGlow = document.getElementById('cursorGlow');
        const scrollProgress = document.getElementById('scrollProgress');

        // ギャラリー生成
        function createGallery() {
            images.forEach((image, index) => {
                const item = document.createElement('div');
                item.className = 'gallery-item';
                item.style.animationDelay = `${index * 0.1}s`;
                
                item.innerHTML = `
                    <img src="${image.src}" alt="${image.title}" loading="lazy">
                    <div class="image-overlay">   
                    </div>
                `;
                
                item.addEventListener('click', () => {
                    lightboxImg.src = image.src;
                    lightboxImg.alt = image.title;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });

                gallery.appendChild(item);
            });
        }

        // マウス追従効果
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = (e.clientX - 10) + 'px';
            cursorGlow.style.top = (e.clientY - 10) + 'px';
        });

        // 磁気効果
        document.addEventListener('mousemove', (e) => {
            const items = document.querySelectorAll('.gallery-item');
            items.forEach(item => {
                const rect = item.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const distance = Math.sqrt(
                    Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
                );
                
                if (distance < 150) {
                    const strength = (150 - distance) / 150;
                    const deltaX = (e.clientX - centerX) * strength * 0.1;
                    const deltaY = (e.clientY - centerY) * strength * 0.1;
                    
                    item.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${1 + strength * 0.05})`;
                } else {
                    item.style.transform = '';
                }
            });
        });

        // スクロール進行バー
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrolled / maxScroll;
            scrollProgress.style.transform = `scaleX(${progress})`;
        });

        // パーティクル生成
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 5000);
        }

        // ライトボックス制御
        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // 初期化
        createGallery();
        
        // パーティクルを定期的に生成
        setInterval(createParticle, 800);
