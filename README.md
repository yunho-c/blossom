# Blossom Project Setup

## Python Environment Setup

This project uses [uv](https://github.com/astral/uv) for Python environment and dependency management. Follow these steps to set up your development environment:

### Prerequisites

1. Install uv:
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

2. Make sure you have Python 3.10 or higher installed:
```bash
python --version
```

### Root Project Setup

The root project contains shared data science dependencies (numpy, pandas, pydantic) and common development tools. To set up:

1. Create and activate a virtual environment in the root directory:
```bash
uv venv
source .venv/bin/activate  # On Unix/macOS
# or
.venv\Scripts\activate  # On Windows
```

2. Install root dependencies:
```bash
uv pip install -e ".[dev]"
```

Available commands:
- `uv run format` - Format all Python code in the repository

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
uv venv
source .venv/bin/activate  # On Unix/macOS
# or
.venv\Scripts\activate  # On Windows
```

3. Install dependencies (including dev dependencies):
```bash
uv pip install -e ".[dev]"
```

4. Run development server:
```bash
uv run start
```

Available commands:
- `uv run start` - Start development server
- `uv run test` - Run tests
- `uv run format` - Format code
- `uv run typecheck` - Run type checking
- `uv run migrate` - Run database migrations
- `uv run makemigrations "message"` - Create new migration

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Create and activate a virtual environment (for Python-related tasks):
```bash
uv venv
source .venv/bin/activate  # On Unix/macOS
# or
.venv\Scripts\activate  # On Windows
```

3. Install dependencies (including dev dependencies):
```bash
uv pip install -e ".[dev]"
```

4. Install Playwright browsers:
```bash
uv run install-browsers
```

Available commands:
- `uv run test` - Run Python tests
- `uv run format` - Format Python code
- `uv run e2e` - Run end-to-end tests with browser
- `uv run install-browsers` - Install/update Playwright browsers

### Development Workflow

1. The project uses a monorepo structure with three Python environments:
   - Root: Contains shared data science dependencies and tools
   - Backend: FastAPI service with its specific dependencies
   - Frontend: Contains Python testing tools and Playwright

2. All projects share a single lockfile at the root of the repository (`uv.lock`). This ensures consistent dependency versions across the project.

3. When adding new dependencies:
   ```bash
   # For shared dependencies (numpy, pandas, etc.)
   cd /path/to/blossom  # root directory
   uv add package_name

   # For service-specific dependencies
   cd backend  # or frontend
   uv add package_name
   ```

4. To update dependencies:
   ```bash
   uv pip freeze > requirements.txt  # Save current state
   uv pip install --upgrade package_name
   ```

5. The virtual environments (`.venv`) are project-specific and should not be committed to version control.

### Code Quality

Both frontend and backend Python code use:
- Black for code formatting
- isort for import sorting
- Ruff for linting
- MyPy for type checking (backend only)

Run formatting tools using:
```bash
uv run format
``` 