    // State management
        let state = {
            darkMode: true,
            selectedCategory: null,
            selectedYear: null,
            selectedSubject: null,
            searchQuery: '',
            currentUser: null
        };

        // Auth state
        let selectedUserType = '';
        let isLoginMode = true;

        // Data structures
        let userDatabase = {};
        let allResources = [];
        let mockResources = {
            academics: {
                '1st': {
                    'Mathematics-I': [
                        { id: 'a1', title: 'Calculus Complete Notes', desc: 'Comprehensive notes covering differentiation and integration', author: 'Dr. MONIKA BISHT', date: 'Nov 5, 2025', downloads: 0, type: 'PDF', category: 'Academics' },
                        { id: 'a2', title: 'Linear Algebra Guide', desc: 'Detailed explanations with solved examples', author: 'Dr. MONIKA BISHT', date: 'Oct 28, 2025', downloads: 0, type: 'PDF', category: 'Academics' }
                    ],
                    'Engineering Physics': [
                        { id: 'a3', title: 'Quantum Mechanics Notes', desc: 'Complete quantum physics theory and problems', author: 'Dr. SHONIKA SHARMA', date: 'Nov 2, 2025', downloads: 0, type: 'PDF', category: 'Academics' }
                    ],
                    'Basic Electrical': [
                        { id: 'a4', title: 'Circuit Analysis Handbook', desc: 'DC and AC circuit analysis with examples', author: 'Prof. JYOTI JOSHI', date: 'Oct 25, 2025', downloads: 0, type: 'PDF', category: 'Academics' }
                    ],
                    'Engineering Chemistry': [
                        { id: 'a5', title: 'Organic Chemistry Notes', desc: 'Complete organic reactions and mechanisms', author: 'Dr. GURPREET KAUR', date: 'Nov 1, 2025', downloads: 0, type: 'PDF', category: 'Academics' }
                    ]
                },
                '2nd': {
                    'Data Structures': [
                        { id: 'a6', title: 'DS Complete Notes', desc: 'Arrays, linked lists, trees, graphs with implementations', author: 'DR. ANUPAM SINGH', date: 'Nov 5, 2025', downloads: 0, type: 'PDF', category: 'Academics' }
                    ],
                    'Digital Electronics': [
                        { id: 'a7', title: 'Logic Gates & Circuits', desc: 'Boolean algebra and combinational circuits', author: 'DR. V. P. DUBEY', date: 'Oct 30, 2025', downloads: 0, type: 'PDF', category: 'Academics' }
                    ]
                },
                '3rd': {
                    'Operating Systems': [
                        { id: 'a8', title: 'OS Handwritten Notes', desc: 'Process management and file systems explained', author: 'MS. SONALI GUPTA', date: 'Nov 3, 2025', downloads: 0, type: 'PDF', category: 'Academics' }
                    ],
                    'Database Systems': [
                        { id: 'a9', title: 'SQL & Normalization Guide', desc: 'Complete SQL queries and database design', author: 'AYUSHI JAIN', date: 'Oct 27, 2025', downloads: 0, type: 'PDF', category: 'Academics' }
                    ]
                },
                '4th': {
                    'Machine Learning': [
                        { id: 'a10', title: 'ML Algorithms Guide', desc: 'Detailed explanation of ML algorithms with Python', author: 'MR. AKASH CHAUHAN', date: 'Nov 4, 2025', downloads: 0, type: 'PDF', category: 'Academics' }
                    ]
                }
            },
            competitive: [
                { id: 'c1', title: 'GATE CS Previous Year Papers', desc: 'Solved question papers from 2015-2024 with explanations', author: 'DR. ANUPAM SINGH', date: 'Nov 3, 2025', downloads: 0, type: 'PDF', category: 'GATE' },
                { id: 'c2', title: 'CAT Quantitative Aptitude Mock Tests', desc: 'Full-length mock tests with detailed solutions', author: 'MR. SUHAIL VIJ', date: 'Nov 2, 2025', downloads: 0, type: 'PDF', category: 'CAT' }
            ],
            dsa: [
                { id: 'd1', title: 'Dynamic Programming Patterns', desc: 'Common DP patterns and practice problems with solutions', author: 'DR. ANUPAM SINGH', date: 'Nov 2, 2025', downloads: 0, type: 'PDF', category: 'Competitive Programming' },
                { id: 'd2', title: 'Graph Algorithms Collection', desc: 'BFS, DFS, Dijkstra, and advanced graph algorithms', author: 'DR. UPENDRA ASWAL', date: 'Oct 29, 2025', downloads: 0, type: 'PDF', category: 'Algorithms' }
            ],
            development: [
                { id: 'dev1', title: 'Machine Learning Algorithms Guide', desc: 'Detailed explanation of ML algorithms', author: 'DR. DEVESH TIWARI', date: 'Nov 4, 2025', downloads: 0, type: 'PDF', category: 'Artificial Intelligence' },
                { id: 'dev2', title: 'React & TypeScript Best Practices', desc: 'Complete React development patterns and TypeScript integration', author: 'DR. AMIT GUPTA', date: 'Nov 1, 2025', downloads: 0, type: 'PDF', category: 'Web Development' }
            ],
            interview: [
                { id: 'i1', title: 'System Design Interview Prep', desc: 'Complete guide to system design interviews with case studies', author: 'MS. GEETIKA BHATIYA', date: 'Nov 6, 2025', downloads: 0, type: 'PDF', category: 'System Design' },
                { id: 'i2', title: 'Behavioral Interview Questions', desc: 'Common behavioral questions with STAR method answers', author: 'MR. ANSHUMAN', date: 'Oct 31, 2025', downloads: 0, type: 'PDF', category: 'Interview Prep' }
            ],
            physical: []
        };

        // Storage helper functions
        function saveToStorage(key, data) {
            try {
                const jsonData = JSON.stringify(data);
                document.cookie = `${key}=${encodeURIComponent(jsonData)}; path=/; max-age=31536000`;
            } catch (e) {
                console.error('Error saving to storage:', e);
            }
        }

        function loadFromStorage(key) {
            try {
                const cookies = document.cookie.split(';');
                for (let cookie of cookies) {
                    const [cookieKey, cookieValue] = cookie.trim().split('=');
                    if (cookieKey === key) {
                        return JSON.parse(decodeURIComponent(cookieValue));
                    }
                }
                return null;
            } catch (e) {
                console.error('Error loading from storage:', e);
                return null;
            }
        }

        function saveUserDatabase() {
            saveToStorage('userDatabase', userDatabase);
        }

        function loadUserDatabase() {
            const loaded = loadFromStorage('userDatabase');
            if (loaded) {
                userDatabase = loaded;
            }
        }

        function saveResources() {
            saveToStorage('mockResources', mockResources);
        }

        function loadResources() {
            const loaded = loadFromStorage('mockResources');
            if (loaded) {
                mockResources = loaded;
            }
        }

        function saveCurrentUser() {
            saveToStorage('currentUser', state.currentUser);
        }

        function loadCurrentUser() {
            const loaded = loadFromStorage('currentUser');
            if (loaded) {
                state.currentUser = loaded;
            }
        }

        const categories = [
            { id: 'academics', name: 'Academics', icon: '📚', color: '#3b82f6' },
            { id: 'competitive', name: 'Competitive Exams', icon: '🏆', color: '#eab308' },
            { id: 'dsa', name: 'CP/DSA', icon: '</>', color: '#10b981' },
            { id: 'development', name: 'Development', icon: '💻', color: '#8b5cf6' },
            { id: 'interview', name: 'Interview Prep', icon: '💼', color: '#ef4444' },
            { id: 'physical', name: 'Physical Tools', icon: '🔧', color: '#f97316' }
        ];

        const academicYears = [
            { id: '1st', name: '1st Year', subjects: ['Mathematics-I', 'Engineering Physics', 'Basic Electrical', 'Engineering Chemistry'] },
            { id: '2nd', name: '2nd Year', subjects: ['Data Structures', 'Digital Electronics', 'Computer Organization', 'Discrete Mathematics'] },
            { id: '3rd', name: '3rd Year', subjects: ['Operating Systems', 'Database Systems', 'Computer Networks', 'Software Engineering'] },
            { id: '4th', name: '4th Year', subjects: ['Machine Learning', 'Compiler Design', 'Cloud Computing', 'Blockchain Technology'] }
        ];

        // Initialize all resources for search
        function initializeResources() {
            allResources = []; // Clear first
            // Flatten all resources
            Object.keys(mockResources).forEach(catKey => {
                if (catKey === 'academics') {
                    Object.keys(mockResources[catKey]).forEach(year => {
                        Object.keys(mockResources[catKey][year]).forEach(subject => {
                            allResources.push(...mockResources[catKey][year][subject]);
                        });
                    });
                } else {
                    allResources.push(...mockResources[catKey]);
                }
            });
        }

        // Theme toggle
        function toggleTheme() {
            state.darkMode = !state.darkMode;
            document.body.className = state.darkMode ? 'dark' : 'light';
            const themeIcons = document.querySelectorAll('.icon-btn');
            themeIcons.forEach(icon => {
                if (icon.textContent.includes('🌙') || icon.textContent.includes('☀️')) {
                    icon.textContent = state.darkMode ? '🌙' : '☀️';
                }
            });
        }

        // Page navigation
        function showLandingPage() {
            document.getElementById('landingPage').classList.remove('hidden');
            document.getElementById('authPage').classList.add('hidden');
            document.getElementById('uploadPage').classList.add('hidden');
            document.getElementById('headerActionsLanding').classList.remove('hidden');
            document.getElementById('headerActionsLoggedIn').classList.add('hidden');
            state.currentUser = null;
            saveCurrentUser();
            resetAuthForm();
        }

        function showLandingPageLoggedIn() {
            document.getElementById('landingPage').classList.remove('hidden');
            document.getElementById('authPage').classList.add('hidden');
            document.getElementById('uploadPage').classList.add('hidden');
            if (state.currentUser) {
                document.getElementById('headerActionsLanding').classList.add('hidden');
                document.getElementById('headerActionsLoggedIn').classList.remove('hidden');
                document.getElementById('headerUserName').textContent = state.currentUser.name;
            }
        }

        function showAuthPage() {
            document.getElementById('landingPage').classList.add('hidden');
            document.getElementById('authPage').classList.remove('hidden');
            document.getElementById('uploadPage').classList.add('hidden');
        }

        function showUploadPage() {
            if (!state.currentUser) {
                alert('Please login first!');
                showAuthPage();
                return;
            }
            document.getElementById('landingPage').classList.add('hidden');
            document.getElementById('authPage').classList.add('hidden');
            document.getElementById('uploadPage').classList.remove('hidden');
            document.getElementById('uploadUserName').textContent = state.currentUser.name;
            resetUploadForm();
        }

        function toggleUserMenu() {
            const menu = document.getElementById('userMenu');
            menu.classList.toggle('hidden');
        }

        function handleLogout() {
            state.currentUser = null;
            showLandingPage();
            alert('Logged out successfully!');
        }

        // Auth functions
        function selectUserType(type) {
            selectedUserType = type;
            const cards = document.querySelectorAll('.user-type-card');
            cards.forEach(card => card.classList.remove('selected'));
            event.target.closest('.user-type-card').classList.add('selected');
            document.getElementById('authForm').classList.remove('hidden');
        }

        function toggleAuthMode() {
            isLoginMode = !isLoginMode;
            document.getElementById('authTitle').textContent = isLoginMode ? 'Welcome Back' : 'Create Account';
            document.getElementById('authButtonText').textContent = isLoginMode ? 'Login' : 'Create Account';
            document.getElementById('authToggleText').textContent = isLoginMode ? "Don't have an account? Sign up" : 'Already have an account? Login';
            document.getElementById('nameGroup').classList.toggle('hidden', isLoginMode);
        }

        function resetAuthForm() {
            selectedUserType = '';
            isLoginMode = true;
            document.getElementById('userTypeSelector').classList.remove('hidden');
            document.getElementById('authForm').classList.add('hidden');
            document.getElementById('nameInput').value = '';
            document.getElementById('emailInput').value = '';
            document.getElementById('passwordInput').value = '';
            document.getElementById('authTitle').textContent = 'Welcome Back';
            document.getElementById('authButtonText').textContent = 'Login';
            document.getElementById('authToggleText').textContent = "Don't have an account? Sign up";
            document.getElementById('nameGroup').classList.add('hidden');
            const cards = document.querySelectorAll('.user-type-card');
            cards.forEach(card => card.classList.remove('selected'));
        }

        function handleAuth() {
            const email = document.getElementById('emailInput').value.trim();
            const password = document.getElementById('passwordInput').value.trim();
            const name = document.getElementById('nameInput').value.trim();

            if (!selectedUserType) {
                alert('Please select user type (Student or Teacher)!');
                return;
            }

            if (!email || !password || (!isLoginMode && !name)) {
                alert('Please fill all fields!');
                return;
            }

            if (isLoginMode) {
                const user = userDatabase[email];
                if (user && user.password === password) {
                    state.currentUser = user;
                    saveCurrentUser();
                    alert('Login successful! Welcome ' + user.name);
                    showLandingPageLoggedIn();
                } else {
                    alert('Invalid credentials! Please check your email and password.');
                }
            } else {
                if (userDatabase[email]) {
                    alert('Email already exists! Please login instead.');
                    return;
                }
                
                const newUser = {
                    name: name,
                    email: email,
                    password: password,
                    userType: selectedUserType
                };
                
                userDatabase[email] = newUser;
                saveUserDatabase();
                alert('Account created successfully! Please login now.');
                toggleAuthMode();
                document.getElementById('emailInput').value = email;
            }
        }

        // Hero search functionality
        function handleHeroSearch() {
            const query = document.getElementById('heroSearchInput').value.trim().toLowerCase();
            const resultsDiv = document.getElementById('heroSearchResults');

            if (query === '') {
                resultsDiv.innerHTML = '';
                return;
            }

            const results = allResources.filter(resource => 
                resource.title.toLowerCase().includes(query) ||
                resource.desc.toLowerCase().includes(query) ||
                (resource.author && resource.author.toLowerCase().includes(query)) ||
                (resource.category && resource.category.toLowerCase().includes(query))
            );

            if (results.length === 0) {
                resultsDiv.innerHTML = '<div class="search-result-item">No results found</div>';
            } else {
                resultsDiv.innerHTML = results.slice(0, 5).map(resource => `
                    <div class="search-result-item" onclick="navigateToResource('${resource.id}')">
                        <div class="search-result-title">${resource.title}</div>
                        <div class="search-result-desc">${resource.desc}</div>
                    </div>
                `).join('');
            }
        }

        function navigateToResource(resourceId) {
            // Find which category/year/subject contains this resource
            let found = false;
            
            // Search in academics
            for (let year in mockResources.academics) {
                for (let subject in mockResources.academics[year]) {
                    const resource = mockResources.academics[year][subject].find(r => r.id === resourceId);
                    if (resource) {
                        state.selectedCategory = 'academics';
                        state.selectedYear = year;
                        state.selectedSubject = subject;
                        showResourceView();
                        found = true;
                        break;
                    }
                }
                if (found) break;
            }
            
            // Search in other categories
            if (!found) {
                for (let catKey of ['competitive', 'dsa', 'development', 'interview', 'physical']) {
                    const resource = mockResources[catKey].find(r => r.id === resourceId);
                    if (resource) {
                        state.selectedCategory = catKey;
                        showResourceView();
                        break;
                    }
                }
            }
            
            // Clear search
            document.getElementById('heroSearchInput').value = '';
            document.getElementById('heroSearchResults').innerHTML = '';
        }

        // Navigation
        function handleBack() {
            if (state.selectedSubject) {
                state.selectedSubject = null;
                showSubjectView();
            } else if (state.selectedYear) {
                state.selectedYear = null;
                showYearView();
            } else if (state.selectedCategory) {
                state.selectedCategory = null;
                showCategoryView();
            }
        }

        function showCategoryView() {
            document.getElementById('categoryView').classList.remove('hidden');
            document.getElementById('yearView').classList.add('hidden');
            document.getElementById('subjectView').classList.add('hidden');
            document.getElementById('resourceView').classList.add('hidden');
            document.getElementById('backBtn').classList.remove('show');
        }

        function showYearView() {
            document.getElementById('categoryView').classList.add('hidden');
            document.getElementById('yearView').classList.remove('hidden');
            document.getElementById('subjectView').classList.add('hidden');
            document.getElementById('resourceView').classList.add('hidden');
            document.getElementById('backBtn').classList.add('show');
            renderYears();
        }

        function showSubjectView() {
            document.getElementById('categoryView').classList.add('hidden');
            document.getElementById('yearView').classList.add('hidden');
            document.getElementById('subjectView').classList.remove('hidden');
            document.getElementById('resourceView').classList.add('hidden');
            document.getElementById('backBtn').classList.add('show');
            renderSubjects();
        }

        function showResourceView() {
            document.getElementById('categoryView').classList.add('hidden');
            document.getElementById('yearView').classList.add('hidden');
            document.getElementById('subjectView').classList.add('hidden');
            document.getElementById('resourceView').classList.remove('hidden');
            document.getElementById('backBtn').classList.add('show');
            renderResources();
        }

        // Render functions
        function renderCategories() {
            const grid = document.getElementById('categoryGrid');
            grid.innerHTML = categories.map(cat => `
                <div class="category-card" onclick="handleCategoryClick('${cat.id}')">
                    <div class="category-icon" style="background-color: ${cat.color}20;">
                        <span style="font-size: 2rem;">${cat.icon}</span>
                    </div>
                    <div class="category-name">${cat.name}</div>
                </div>
            `).join('');
        }

        function renderYears() {
            const grid = document.getElementById('yearGrid');
            grid.innerHTML = academicYears.map(year => `
                <div class="category-card" onclick="handleYearClick('${year.id}')">
                    <div class="category-icon" style="background-color: #3b82f620;">
                        <span style="font-size: 2rem;">📚</span>
                    </div>
                    <div class="category-name">${year.name}</div>
                    <div class="category-info">${year.subjects.length} subjects</div>
                </div>
            `).join('');
        }

        function renderSubjects() {
            const year = academicYears.find(y => y.id === state.selectedYear);
            document.getElementById('subjectViewTitle').textContent = `Select Subject - ${year.name}`;
            const grid = document.getElementById('subjectGrid');
            grid.innerHTML = year.subjects.map(subject => `
                <div class="category-card" onclick="handleSubjectClick('${subject}')">
                    <div class="category-name">${subject}</div>
                    <div style="margin-top: 0.5rem; opacity: 0.6;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline;">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </div>
                </div>
            `).join('');
        }

        function renderResources() {
            const resources = getCurrentResources();
            const categoryName = state.selectedSubject || categories.find(c => c.id === state.selectedCategory)?.name;
            document.getElementById('resourceViewTitle').textContent = categoryName;
            document.getElementById('resourceCount').textContent = `${resources.length} resources found`;
            
            const grid = document.getElementById('resourceGrid');
            const emptyState = document.getElementById('emptyState');
            
            if (resources.length === 0) {
                grid.innerHTML = '';
                emptyState.classList.remove('hidden');
            } else {
                emptyState.classList.add('hidden');
                grid.innerHTML = resources.map(resource => `
                    <div class="resource-card">
                        <div class="resource-header">
                            <span class="resource-category">${resource.category || categoryName}</span>
                            <div class="resource-type">${resource.type}</div>
                        </div>
                        <h3 class="resource-title">${resource.title}</h3>
                        <p class="resource-desc">${resource.desc}</p>
                        <div class="resource-meta">
                            <div class="meta-item">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                <span>${resource.author || resource.owner}</span>
                            </div>
                            ${resource.date ? `
                                <div class="meta-item">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    <span>${resource.date}</span>
                                </div>
                            ` : ''}
                            ${resource.downloads !== undefined ? `
                                <div class="meta-item">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="7 10 12 15 17 10"></polyline>
                                        <line x1="12" y1="15" x2="12" y2="3"></line>
                                    </svg>
                                    <span>${resource.downloads} downloads</span>
                                </div>
                            ` : ''}
                            ${resource.available !== undefined ? `
                                <div class="meta-item ${resource.available ? 'available' : 'not-available'}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    <span>${resource.available ? 'Available' : 'Not Available'}</span>
                                </div>
                            ` : ''}
                        </div>
                        <div class="resource-actions">
                            ${resource.type === 'Tool' ? `
                                <button class="btn-primary borrow" ${!resource.available ? 'disabled' : ''} onclick="handleBorrowRequest('${resource.id}')">
                                    ${resource.available ? 'Borrow Request' : 'Currently Unavailable'}
                                </button>
                                ${state.currentUser && (resource.ownerEmail === state.currentUser.email) ? `
                                    <button class="btn-secondary" style="background: #ef4444; color: white; border: none;" onclick="handleDeleteResource('${resource.id}')">Delete</button>
                                ` : ''}
                            ` : `
                                <button class="btn-primary download" onclick="handleDownload('${resource.id}')">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="7 10 12 15 17 10"></polyline>
                                        <line x1="12" y1="15" x2="12" y2="3"></line>
                                    </svg>
                                    Download
                                </button>
                                <button class="btn-secondary" onclick="handleBorrowRequest('${resource.id}')">Borrow</button>
                                ${state.currentUser && (resource.ownerEmail === state.currentUser.email || resource.author === state.currentUser.name) ? `
                                    <button class="btn-secondary" style="background: #ef4444; color: white; border: none;" onclick="handleDeleteResource('${resource.id}')">Delete</button>
                                ` : ''}
                            `}
                        </div>
                    </div>
                `).join('');
            }
        }

        // Helper functions
        function getCurrentResources() {
            if (!state.selectedCategory) return [];
            
            if (state.selectedCategory === 'academics') {
                if (!state.selectedYear || !state.selectedSubject) return [];
                return mockResources.academics[state.selectedYear]?.[state.selectedSubject] || [];
            }
            
            return mockResources[state.selectedCategory] || [];
        }

        // Event handlers
        function handleCategoryClick(categoryId) {
            state.selectedCategory = categoryId;
            state.selectedYear = null;
            state.selectedSubject = null;
            
            if (categoryId === 'academics') {
                showYearView();
            } else {
                showResourceView();
            }
        }

        function handleYearClick(yearId) {
            state.selectedYear = yearId;
            state.selectedSubject = null;
            showSubjectView();
        }

        function handleSubjectClick(subject) {
            state.selectedSubject = subject;
            showResourceView();
        }

        function handleDownload(resourceId) {
            alert('Download started for resource ID: ' + resourceId);
        }

        function handleDeleteResource(resourceId) {
            if (!state.currentUser) {
                alert('Please login first!');
                return;
            }
            
            if (!confirm('Are you sure you want to delete this resource?')) {
                return;
            }
            
            let deleted = false;
            
            // Search and delete from all categories
            for (let catKey in mockResources) {
                if (catKey === 'academics') {
                    for (let year in mockResources[catKey]) {
                        for (let subject in mockResources[catKey][year]) {
                            const index = mockResources[catKey][year][subject].findIndex(r => r.id === resourceId);
                            if (index !== -1) {
                                const resource = mockResources[catKey][year][subject][index];
                                // Check if user owns this resource
                                if (resource.ownerEmail === state.currentUser.email || resource.author === state.currentUser.name) {
                                    mockResources[catKey][year][subject].splice(index, 1);
                                    deleted = true;
                                } else {
                                    alert('You can only delete your own resources!');
                                    return;
                                }
                                break;
                            }
                        }
                        if (deleted) break;
                    }
                } else {
                    const index = mockResources[catKey].findIndex(r => r.id === resourceId);
                    if (index !== -1) {
                        const resource = mockResources[catKey][index];
                        // Check if user owns this resource
                        if (resource.ownerEmail === state.currentUser.email || resource.owner === state.currentUser.name) {
                            mockResources[catKey].splice(index, 1);
                            deleted = true;
                        } else {
                            alert('You can only delete your own resources!');
                            return;
                        }
                        break;
                    }
                }
                if (deleted) break;
            }
            
            // Also remove from allResources array
            const allIndex = allResources.findIndex(r => r.id === resourceId);
            if (allIndex !== -1) {
                allResources.splice(allIndex, 1);
            }
            
            if (deleted) {
                saveResources();
                alert('Resource deleted successfully!');
                renderResources(); // Refresh the view
            } else {
                alert('Resource not found!');
            }
        }

        function handleBorrowRequest(resourceId) {
            if (!state.currentUser) {
                alert('Please login to send a borrow request!');
                showAuthPage();
                return;
            }
            
            // Find the resource
            let resource = null;
            
            // Search in all categories
            for (let catKey in mockResources) {
                if (catKey === 'academics') {
                    for (let year in mockResources[catKey]) {
                        for (let subject in mockResources[catKey][year]) {
                            const found = mockResources[catKey][year][subject].find(r => r.id === resourceId);
                            if (found) {
                                resource = found;
                                break;
                            }
                        }
                        if (resource) break;
                    }
                } else {
                    const found = mockResources[catKey].find(r => r.id === resourceId);
                    if (found) {
                        resource = found;
                        break;
                    }
                }
                if (resource) break;
            }
            
            if (resource) {
                if (resource.type === 'Tool' && resource.ownerEmail) {
                    // Show owner's email for physical tools
                    alert(`Borrow Request Information:\n\nContact the owner at:\n📧 ${resource.ownerEmail}\n\nOwner: ${resource.owner}\n\nSend them an email to request borrowing this item.`);
                } else if (resource.ownerEmail) {
                    alert(`Contact Information:\n\n📧 ${resource.ownerEmail}\n\nYou can reach out to borrow this resource.`);
                } else {
                    alert('Borrow request sent successfully!');
                }
            }
        }

        // Upload form functions
        function resetUploadForm() {
            document.getElementById('uploadTitle').value = '';
            document.getElementById('uploadDesc').value = '';
            document.getElementById('uploadCategory').value = '';
            document.getElementById('uploadYear').value = '';
            document.getElementById('uploadSubject').value = '';
            document.getElementById('uploadType').value = 'PDF';
            document.getElementById('uploadAvailable').checked = true;
            document.getElementById('uploadYearGroup').classList.add('hidden');
            document.getElementById('uploadSubjectGroup').classList.add('hidden');
        }

        function handleCategoryChange() {
            const category = document.getElementById('uploadCategory').value;
            const yearGroup = document.getElementById('uploadYearGroup');
            const subjectGroup = document.getElementById('uploadSubjectGroup');
            
            if (category === 'academics') {
                yearGroup.classList.remove('hidden');
            } else {
                yearGroup.classList.add('hidden');
                subjectGroup.classList.add('hidden');
            }
        }

        function handleYearChangeUpload() {
            const year = document.getElementById('uploadYear').value;
            const subjectGroup = document.getElementById('uploadSubjectGroup');
            const subjectSelect = document.getElementById('uploadSubject');
            
            if (year) {
                const yearData = academicYears.find(y => y.id === year);
                subjectSelect.innerHTML = '<option value="">Select Subject</option>' + 
                    yearData.subjects.map(s => `<option value="${s}">${s}</option>`).join('');
                subjectGroup.classList.remove('hidden');
            } else {
                subjectGroup.classList.add('hidden');
            }
        }

        function handleResourceUpload() {
            const title = document.getElementById('uploadTitle').value.trim();
            const desc = document.getElementById('uploadDesc').value.trim();
            const category = document.getElementById('uploadCategory').value;
            const type = document.getElementById('uploadType').value;
            
            if (!title || !desc || !category) {
                alert('Please fill in all required fields!');
                return;
            }
            
            const newResource = {
                id: 'user_' + Date.now(),
                title: title,
                desc: desc,
                author: state.currentUser.name,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                downloads: 0,
                type: type,
                category: category,
                ownerEmail: state.currentUser.email
            };
            
            if (category === 'academics') {
                const year = document.getElementById('uploadYear').value;
                const subject = document.getElementById('uploadSubject').value;
                
                if (!year || !subject) {
                    alert('Please select year and subject for academic resources!');
                    return;
                }
                
                if (!mockResources.academics[year]) {
                    mockResources.academics[year] = {};
                }
                if (!mockResources.academics[year][subject]) {
                    mockResources.academics[year][subject] = [];
                }
                
                mockResources.academics[year][subject].push(newResource);
            } else {
                if (type === 'Tool') {
                    newResource.owner = state.currentUser.name;
                    newResource.available = document.getElementById('uploadAvailable').checked;
                }
                mockResources[category].push(newResource);
            }
            
            allResources.push(newResource);
            saveResources();
            alert('Resource uploaded successfully!');
            showLandingPageLoggedIn();
        }

        // Initialize
        function init() {
            // Load saved data
            loadUserDatabase();
            loadResources();
            loadCurrentUser();
            
            initializeResources();
            renderCategories();
            
            // Create demo accounts if not exist
            if (!userDatabase['student@unishare.com']) {
                userDatabase['student@unishare.com'] = {
                    name: 'Demo Student',
                    email: 'student@unishare.com',
                    password: 'student123',
                    userType: 'student'
                };
            }
            
            if (!userDatabase['teacher@unishare.com']) {
                userDatabase['teacher@unishare.com'] = {
                    name: 'Demo Teacher',
                    email: 'teacher@unishare.com',
                    password: 'teacher123',
                    userType: 'teacher'
                };
            }
            
            saveUserDatabase();
            
            // Check if user is logged in
            if (state.currentUser) {
                showLandingPageLoggedIn();
            }
        }

        init();
