var documenterSearchIndex = {"docs":
[{"location":"functions.html#Legendre","page":"Functions","title":"Legendre","text":"","category":"section"},{"location":"functions.html#Exposed-Functions","page":"Functions","title":"Exposed Functions","text":"","category":"section"},{"location":"functions.html","page":"Functions","title":"Functions","text":"FiniteHilbertTransform.LegendreFHT\nFiniteHilbertTransform.GettabD!\nFiniteHilbertTransform.Heaviside\nFiniteHilbertTransform.tabQLeg!\nFiniteHilbertTransform.tabPLeg!\nFiniteHilbertTransform.GetaXi!\nFiniteHilbertTransform.GetaXi","category":"page"},{"location":"functions.html#FiniteHilbertTransform.LegendreFHT","page":"Functions","title":"FiniteHilbertTransform.LegendreFHT","text":"LegendreFHT\n\nType representing Legendre Finite Hilbert Transform (FHT) parameters.\n\nThis struct stores the necessary parameters for performing a Finite Hilbert Transform using Legendre functions. It implements the AbstractFHT interface and provides the required data structures and computations for Legendre FHT.\n\nFields:\n\nname::String: FHT name (default: \"Legendre\").\nKu::Int64: Number of sample points.\ntabu::Array{Float64,1}: Array containing u values (sampling points).\ntabw::Array{Float64,1}: Array containing w values (weights at sampling points).\ntabP::Matrix{Float64}: Matrix containing P_k(u) values (Ku x Ku).\ntabc::Vector{Float64}: Vector containing prefactor values at each sampling point.\ntabPLeg::Array{ComplexF64,1}: Static container for tabPLeg (Legendre functions of the first kind).\ntabQLeg::Array{ComplexF64,1}: Static container for tabQLeg (Hilbert-transformed Legendre functions).\ntabDLeg::Array{ComplexF64,1}: Static container for tabDLeg (Derivatives of Legendre functions).\n\nExample:\n\nKu = 100\ntabu = collect(-1.0:2/(Ku-1):1.0)\ntabw = compute_weights(tabu) # Compute weights for Legendre functions\ntabP = compute_legendre_matrix(tabu) # Compute Legendre functions matrix\ntabc = compute_prefactors(tabu) # Compute Legendre prefactors\n\nFHT = LegendreFHT(\"Legendre\", Ku, tabu, tabw, tabP, tabc, zeros(ComplexF64, Ku), zeros(ComplexF64, Ku), zeros(ComplexF64, Ku))\n\n\n\n\n\n","category":"type"},{"location":"functions.html#FiniteHilbertTransform.GettabD!","page":"Functions","title":"FiniteHilbertTransform.GettabD!","text":"fill fht at a given complex frequency for the integration being considered\n\nintegration style selection is automatic: if you want to specify a type, call out to the specific integration method.\n\n\n\n\n\nGettabD!(omg::Complex{Float64}, struct_tabLeg::LegendreFHT; verbose::Int64=0)\n\nFill struct_tabLeg at a given complex frequency omg for the integration being considered.\n\nArguments\n\nomg::Complex{Float64}: Complex frequency value.\nstruct_tabLeg::LegendreFHT: LegendreFHT structure to fill.\nverbose::Int64: Verbosity level (default: 0).\n\nDescription\n\nGettabD! automatically selects the integration style based on the imaginary part of omg. If the imaginary part is negative, it uses damped integration. If it's exactly zero, it uses neutral mode calculation. Otherwise, it uses unstable integration.\n\nExample\n\ntabLeg = LegendreFHT(10)\nomg = 1.0 + 0.5im\nGettabD!(omg, tabLeg, verbose=2)\n\n\n\n\n\n","category":"function"},{"location":"functions.html#FiniteHilbertTransform.Heaviside","page":"Functions","title":"FiniteHilbertTransform.Heaviside","text":"Heaviside(x::Float64)\n\nCalculate the Heaviside function on the interval [-1, 1].\n\nThe Heaviside function, denoted as H(x), is defined as follows:\n\nH(x) = 0 for x < -1\nH(x) = 0.5 for x = -1\nH(x) = 1 for -1 < x < 1\nH(x) = 0.5 for x = 1\nH(x) = 0 for x > 1\n\nATTENTION: The equality tests on Float64 might not be very robust.\n\nArguments:\n\nx::Float64: Real number for which Heaviside function is calculated.\n\nReturns:\n\nFloat64: Value of the Heaviside function at x.\n\nExample:\n\nx = 0.5\nresult = Heaviside(x)  # Returns 1.0\n\n\n\n\n\n","category":"function"},{"location":"functions.html#FiniteHilbertTransform.tabQLeg!","page":"Functions","title":"FiniteHilbertTransform.tabQLeg!","text":"tabQLeg!(omg::ComplexF64, val_0::ComplexF64, val_1::ComplexF64, tabQLeg::Array{ComplexF64,1})\n\nPrecompute Hilbert-transformed Legendre functions for a given complex frequency.\n\nArguments:\n\nomg::ComplexF64: Complex frequency. (ATTENTION: Must be complex.)\nval_0::ComplexF64: Initial value for k = 0. (ATTENTION: Must be complex.)\nval_1::ComplexF64: Initial value for k = 1. (ATTENTION: Must be complex.)\ntabQLeg::Array{ComplexF64,1}: Container to store the precomputed Hilbert-transformed Legendre functions.\n\nDetails:\n\nThis function uses different recurrence relations based on the location of the complex frequency omg. If omg is sufficiently close to the real line [-1,1], it employs an upward recurrence. Otherwise, if omg is far away from the real line [-1,1], it uses a backward recurrence. The transition between these regimes is determined dynamically.\n\nThe transition from the two regimes follows from the thesis Stable Implementation of Three-Term Recurrence Relations, Pascal Frederik Heiter, June, 2010 https://www.uni-ulm.de/fileadmin/websiteuniulm/mawi.inst.070/funken/bachelorarbeiten/bachelorthesis_pfh.pdf\n\nExample:\n\nomg = 1.0 + 2.0im\nval_0 = 1.0 + 1.0im\nval_1 = 2.0 + 2.0im\nKu = 10\ntabQLeg = zeros(ComplexF64, Ku)\ntabQLeg!(omg, val_0, val_1, tabQLeg)\n\n\n\n\n\n","category":"function"},{"location":"functions.html#FiniteHilbertTransform.tabPLeg!","page":"Functions","title":"FiniteHilbertTransform.tabPLeg!","text":"tabPLeg!(omg::Complex{Float64}, val_0::Complex{Float64}, val_1::Complex{Float64}, Ku::Int64, tabPLeg::Vector{Complex{Float64}})\n\nPre-computes the Legendre functions, P_k(w), for a given complex frequency.\n\nArguments\n\nomg::Complex{Float64}: Complex frequency.\nval_0::Complex{Float64}: Initial value in k=0.\nval_1::Complex{Float64}: Initial value in k=1.\nKu::Int64: Number of Legendre modes.\ntabPLeg::Vector{Complex{Float64}}: Container to store the results.\n\nDescription\n\ntabPLeg! pre-computes the Legendre functions, P_k(w), for a given complex frequency omg using the upward recurrence method. The results are stored in tabPLeg.\n\nExample\n\nomg = 1.0 + 0.5im\nval_0 = 0.0 + 0.0im\nval_1 = 1.0 + 0.0im\nKu = 10\ntabPLeg = zeros(Complex{Float64}, Ku)\ntabPLeg!(omg, val_0, val_1, Ku, tabPLeg)\n\n\n\n\n\n","category":"function"},{"location":"functions.html#FiniteHilbertTransform.GetaXi!","page":"Functions","title":"FiniteHilbertTransform.GetaXi!","text":"GetaXi!(FHT::LegendreFHT, tabGXi::AbstractVector{Float64}, res::Vector{Float64}, warnflag::Vector{Float64})\n\nCompute the Finite Hilbert Transform for Legendre functions.\n\nArguments\n\nFHT::LegendreFHT: An object representing the Legendre Finite Hilbert Transform.\ntabGXi::AbstractVector{Float64}: Vector containing precomputed values of G[u_i].\nres::Vector{Float64}: Output vector to store the results of the Finite Hilbert Transform.\nwarnflag::Vector{Float64}: Vector to store warning flags for each Legendre function.\n\nDetails\n\nThis function computes the Finite Hilbert Transform for Legendre functions based on the provided precomputed values of G[u_i].\n\nOutput\n\nres::Vector{Float64}: Vector containing the results of the Finite Hilbert Transform for Legendre functions.\nwarnflag::Vector{Float64}: Vector containing warning flags. Each element represents the number of NaN or INF contributions for the corresponding Legendre function.\n\nExample\n\nFHT = LegendreFHT(parameters)\ntabGXi = compute_tabGXi(...)  # Precompute tabGXi values\nres = zeros(Float64, FHT.Ku)\nwarnflag = zeros(Float64, FHT.Ku)\nGetaXi!(FHT, tabGXi, res, warnflag)\n\n\n\n\n\n","category":"function"},{"location":"functions.html#FiniteHilbertTransform.GetaXi","page":"Functions","title":"FiniteHilbertTransform.GetaXi","text":"@IMPROVE: how do we handle bad G values?\n\n\n\n\n\nGetaXi(FHT::LegendreFHT, tabGXi::Array{Float64})\n\nCalculate the Finite Hilbert Transform for Legendre functions.\n\nThis function computes the Finite Hilbert Transform for Legendre functions based on the provided Legendre Finite Hilbert Transform parameters and precomputed values of G[u_i]. The results are stored in a vector, and warning flags indicating NaN or INF contributions are also provided.\n\nArguments:\n\nFHT::LegendreFHT: An object representing the Legendre Finite Hilbert Transform.\ntabGXi::Array{Float64}: Array containing precomputed values of G[u_i].\n\nReturns:\n\nres::Vector{Float64}: Vector containing the results of the Finite Hilbert Transform for Legendre functions.\nwarnflag::Vector{Float64}: Vector containing warning flags. Each element represents the number of NaN or INF contributions for the corresponding Legendre function.\n\nExample:\n\nFHT = LegendreFHT(parameters)\ntabGXi = compute_tabGXi(...)  # Precompute tabGXi values\nres, warnflag = GetaXi(FHT, tabGXi)\n\n\n\n\n\n","category":"function"},{"location":"functions.html#Implementation-of-Landau-Integral","page":"Functions","title":"Implementation of Landau Integral","text":"","category":"section"},{"location":"functions.html","page":"Functions","title":"Functions","text":"FiniteHilbertTransform.tabLeg!_UNSTABLE\nFiniteHilbertTransform.tabLeg!_NEUTRAL\nFiniteHilbertTransform.tabLeg!_DAMPED","category":"page"},{"location":"functions.html#FiniteHilbertTransform.tabLeg!_UNSTABLE","page":"Functions","title":"FiniteHilbertTransform.tabLeg!_UNSTABLE","text":"tabLeg!_UNSTABLE(omg::Complex{Float64}, struct_tabLeg::LegendreFHT)\n\nComputes the Legendre coefficients D_k(w) using the UNSTABLE integration method.\n\nArguments\n\nomg::Complex{Float64}: Complex frequency.\nstruct_tabLeg::LegendreFHT: LegendreFHT structure.\n\nDescription\n\ntabLeg!_UNSTABLE computes the Legendre coefficients Dk(w) using the UNSTABLE integration method. It computes the coefficients by first calculating the coefficients Qk(w) and then setting Dk(w) equal to Qk(w) for each k.\n\nNotes\n\nThis function assumes that the container for Dk(w) (`structtabLeg.tabDLeg) and Q_k(w) (structtabLeg.tabQLeg) are already initialized in thestructtabLeg`.\n\n\n\n\n\n","category":"function"},{"location":"functions.html#FiniteHilbertTransform.tabLeg!_NEUTRAL","page":"Functions","title":"FiniteHilbertTransform.tabLeg!_NEUTRAL","text":"tabLeg!_NEUTRAL(omg::Complex{Float64}, struct_tabLeg::LegendreFHT)\n\nFill in all the Legendre arrays for a NEUTRAL mode, i.e., Im[w] = 0.0.\n\nArguments\n\nomg::Complex{Float64}: Complex frequency.\nstruct_tabLeg::LegendreFHT: LegendreFHT structure.\n\nDescription\n\ntabLeg!_NEUTRAL fills in all the Legendre arrays for a NEUTRAL mode, where Im[w] = 0.0. It computes the Legendre coefficients Dk(w) and, if needed, Legendre polynomials Pk(w) for the given complex frequency.\n\n\n\n\n\n","category":"function"},{"location":"functions.html#FiniteHilbertTransform.tabLeg!_DAMPED","page":"Functions","title":"FiniteHilbertTransform.tabLeg!_DAMPED","text":"tabLeg!_DAMPED(omg::Complex{Float64}, struct_tabLeg::LegendreFHT)\n\nFill in all the Legendre arrays for a DAMPED mode, i.e., Im[w] < 0.0.\n\nArguments\n\nomg::Complex{Float64}: Complex frequency.\nstruct_tabLeg::LegendreFHT: LegendreFHT structure.\n\nDescription\n\ntabLeg!_DAMPED fills in all the Legendre arrays for a DAMPED mode, where Im[w] < 0.0. It computes the Legendre coefficients Dk(w) and, if needed, Legendre polynomials Pk(w) for the given complex frequency.\n\n\n\n\n\n","category":"function"},{"location":"functions.html#Helper-Functions","page":"Functions","title":"Helper Functions","text":"","category":"section"},{"location":"functions.html","page":"Functions","title":"Functions","text":"FiniteHilbertTransform.tabuwGLquad\nFiniteHilbertTransform.tabINVcGLquad\nFiniteHilbertTransform.tabPGLquad\nFiniteHilbertTransform.tabGLquad","category":"page"},{"location":"functions.html#FiniteHilbertTransform.tabuwGLquad","page":"Functions","title":"FiniteHilbertTransform.tabuwGLquad","text":"tabuwGLquad(K_u::Int64)\n\nInitialize the nodes (u) and weights (w) of the Gauss-Legendre quadrature.\n\nArguments\n\nK_u::Int64: Number of Legendre modes.\n\nReturns\n\ntabuGLquad::Vector{Float64}: Vector of nodes (u) of the Gauss-Legendre quadrature.\ntabwGLquad::Vector{Float64}: Vector of weights (w) of the Gauss-Legendre quadrature.\n\nDescription\n\ntabuwGLquad initializes the nodes (u) and weights (w) of the Gauss-Legendre quadrature using the FastGaussQuadrature package. It computes the nodes and weights for the Gauss-Legendre quadrature and returns them as vectors.\n\nExample\n\nK_u = 5\ntabuGLquad, tabwGLquad = tabuwGLquad(K_u)\n\nNotes\n\nThis function computes the nodes and weights for the Gauss-Legendre quadrature using external libraries.\n\n\n\n\n\n","category":"function"},{"location":"functions.html#FiniteHilbertTransform.tabINVcGLquad","page":"Functions","title":"FiniteHilbertTransform.tabINVcGLquad","text":"tabINVcGLquad(K_u::Int64)\n\nInitialize the normalization constant INVc = 1/c_k = (2k+1)/2.\n\nArguments\n\nK_u::Int64: Number of Legendre modes.\n\nReturns\n\ntabINVcGLquad::Vector{Float64}: Vector of normalization constants.\n\nDescription\n\ntabINVcGLquad initializes the normalization constant INVc for Legendre modes. It computes the normalization constant for each Legendre mode and stores the results in a vector.\n\nExample\n\nK_u = 5\ntabINVcGLquad = tabINVcGLquad(K_u)\n\nNotes\n\nThis function computes the normalization constant for Legendre modes indexed from 0 to K_u-1.\nATTENTION: It corresponds to the INVERSE normalization constant.\n\n\n\n\n\n","category":"function"},{"location":"functions.html#FiniteHilbertTransform.tabPGLquad","page":"Functions","title":"FiniteHilbertTransform.tabPGLquad","text":"tabPGLquad(K_u::Int64, tabuGLquad::Vector{Float64})\n\nInitialize the values of the Legendre polynomials.\n\nArguments\n\nK_u::Int64: Number of Legendre modes.\ntabuGLquad::Vector{Float64}: Vector of nodes (u) of the Gauss-Legendre quadrature.\n\nReturns\n\ntabPGLquad::Matrix{Float64}: Matrix of Legendre polynomials.\n\nDescription\n\ntabPGLquad initializes the values of the Legendre polynomials and stores them in a matrix. Each column of the matrix corresponds to the Legendre polynomials evaluated at a specific node (u) from the Gauss-Legendre quadrature.\n\nExample\n\nK_u = 5\ntabuGLquad, _ = tabuwGLquad(K_u)\ntabPGLquad = tabPGLquad(K_u, tabuGLquad)\n\nNotes\n\nThis function computes the Legendre polynomials using Bonnet's recurrence relation.\nATTENTION: It corresponds to the INVERSE normalization constant.\n\n\n\n\n\n","category":"function"},{"location":"functions.html#FiniteHilbertTransform.tabGLquad","page":"Functions","title":"FiniteHilbertTransform.tabGLquad","text":"tabGLquad(K_u::Int64)\n\nInitialize the nodes and weights of Gauss-Legendre quadrature.\n\nArguments\n\nK_u::Int64: Number of Legendre modes.\n\nReturns\n\ntabuGLquad::Vector{Float64}: Vector of nodes (u) of the Gauss-Legendre quadrature.\ntabwGLquad::Vector{Float64}: Vector of weights (w) of the Gauss-Legendre quadrature.\nINVcGLquad::Vector{Float64}: Vector of normalization constants for Legendre polynomials.\nPGLquad::Matrix{Float64}: Matrix of Legendre polynomials evaluated at quadrature points.\n\nDescription\n\ntabGLquad initializes the nodes (u) and weights (w) of the Gauss-Legendre quadrature, along with the normalization constants and Legendre polynomials evaluated at quadrature points.\n\nExample\n\nK_u = 5\ntabuGLquad, tabwGLquad, INVcGLquad, PGLquad = tabGLquad(K_u)\n\n\n\n\n\n","category":"function"},{"location":"functions.html#Chebyshev","page":"Functions","title":"Chebyshev","text":"","category":"section"},{"location":"functions.html","page":"Functions","title":"Functions","text":"FiniteHilbertTransform.ChebyshevFHT\nFiniteHilbertTransform.GettabD!(omg::ComplexF64,fht::FiniteHilbertTransform.ChebyshevFHT)","category":"page"},{"location":"functions.html#FiniteHilbertTransform.ChebyshevFHT","page":"Functions","title":"FiniteHilbertTransform.ChebyshevFHT","text":"ChebyshevFHT\n\n\n\n\n\n","category":"type"},{"location":"functions.html#FiniteHilbertTransform.GettabD!-Tuple{ComplexF64, FiniteHilbertTransform.ChebyshevFHT}","page":"Functions","title":"FiniteHilbertTransform.GettabD!","text":"fill fht at a given complex frequency for the integration being considered\n\nintegration style selection is automatic: if you want to specify a type, call out to the specific integration method.\n\n\n\n\n\n","category":"method"},{"location":"installation.html#Installation","page":"Installation","title":"Installation","text":"","category":"section"},{"location":"installation.html","page":"Installation","title":"Installation","text":"FiniteHilbertTransform is currently unregistered. To add it to your julia registry, follow these steps:","category":"page"},{"location":"installation.html","page":"Installation","title":"Installation","text":"Read Documentation: For detailed instructions, check here.\nAdd Package: Use the package manager and execute the following command:  julia  add \"git@github.com:michael-petersen/FiniteHilbertTransform.git\"","category":"page"},{"location":"installation.html","page":"Installation","title":"Installation","text":"or at the command line","category":"page"},{"location":"installation.html","page":"Installation","title":"Installation","text":"    $ julia -e 'using Pkg; Pkg.add(url=\"https://github.com/JuliaStellarDynamics/FiniteHilbertTransform.jl.git\")'\n    ```\n\n3. **Handling Git Keys:** If you encounter Git key errors, register your private key using the Julia shell prompt (access with `;`), and point to your private key:\n    ```julia\n    ssh-add ~/.ssh/id_rsa\n    ```\n\n\n4. **Verify Version:** Confirm the current version with `status FiniteHilbertTransform` in the julia package manager.\n\n5. **Import Package:** Import the package in your julia environment with `import FiniteHilbertTransform`.\n\n## Working from Source\n\nAlternatively, work directly from the codebase:\n\n1. **Activate Environment:** In the main directory of the package, enter the Julia environment using `julia`.\n\n2. **Access Package Manager:** Inside the Julia environment, open the package manager with `]`.\n\n3. **Activate Project:** Activate the project using `activate .`. For added safety, resolve dependencies using `resolve` to check for updates.\n\n4. **Return to Julia Interpreter:** Exit the package manager with `[backspace]`. You are now equipped with the latest package version.\n\n5. **Import Package:** Import the package by typing `using FiniteHilbertTransform` in the Julia interpreter.\n\nAlternately, you may clone the repository wherever you want and create a local environment (or project) by running:","category":"page"},{"location":"installation.html","page":"Installation","title":"Installation","text":"$ git clone https://github.com/JuliaStellarDynamics/FiniteHilbertTransform.jl.git $ cd FiniteHilbertTransform.jl $ julia –project=. -e 'using Pkg; Pkg.precompile()'","category":"page"},{"location":"installation.html","page":"Installation","title":"Installation","text":"\nNote: If you are using a new Julia interpreter, you might need to download additional packages. Use the following command:","category":"page"},{"location":"installation.html","page":"Installation","title":"Installation","text":"julia using(Pkg) Pkg.instantiate() ```","category":"page"},{"location":"installation.html","page":"Installation","title":"Installation","text":"For detailed instructions, check here.","category":"page"},{"location":"installation.html","page":"Installation","title":"Installation","text":"If you are new to julia, install the latest version by running this in your terminal: $ curl -fsSL https://install.julialang.org | sh. If you are on Windows or run into problems with curl-based installation, please visit this website.","category":"page"},{"location":"installation.html","page":"Installation","title":"Installation","text":"Note that if you use this install option you will always need to run codes in the project context by adding the option --project=/path/to/FiniteHilbertTransform.jl after julia. The library will not be accessible in your global julia context.","category":"page"},{"location":"installation.html","page":"Installation","title":"Installation","text":"Do not forget the option --project=/path/to/FiniteHilbertTransform.jl after julia if you installed the library locally.","category":"page"},{"location":"index.html#FiniteHilbertTransform.jl","page":"Home","title":"FiniteHilbertTransform.jl","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"Computation of Hilbert Transform with finite boundaries and Landau's prescription.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"While both Legendre and Chebyshev methods are implemented, we recommend using Legendre techniques for integration.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"FiniteHilbertTransform.jl's core functionality precomputes the Hilbert-transformed Legendre functions Q_k(w) for a given complex frequency omg. The Hilbert transform is defined as Q_k(w) = int_-1^1 fracP_k(u)u - w du, where P_k(u) is the Legendre function of the first kind. It is important to note that Q_k(w) = -2 q_k(w) for real values of w, where q_k(w) represents the Legendre functions of the second kind.","category":"page"},{"location":"example.html#Quick-use-test","page":"Example","title":"Quick use test","text":"","category":"section"},{"location":"example.html","page":"Example","title":"Example","text":"An introductory non-trivial example is given in examples/run_plasma.jl. This script will recreate Figure E1 from Fouvry & Prunet (2021).","category":"page"},{"location":"example.html","page":"Example","title":"Example","text":"If you installed the library using the first (global) install option, just download this example file from the github repository.","category":"page"},{"location":"example.html","page":"Example","title":"Example","text":"Run the code with the following command:","category":"page"},{"location":"example.html","page":"Example","title":"Example","text":"$ julia /path/to/run_plasma.jl","category":"page"},{"location":"example.html","page":"Example","title":"Example","text":"This example will first install some required libraries (Plots, ArgParse). These installations might take a few minutes when first called.","category":"page"},{"location":"example.html","page":"Example","title":"Example","text":"The resulting plot will be created in the same folder as the test code under the name plasmademo.png.","category":"page"},{"location":"example.html","page":"Example","title":"Example","text":"(Image: `Plasma Demonstration`)","category":"page"}]
}