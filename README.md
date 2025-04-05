# Blossom Project Setup

## Python Environment Setup

This project uses [uv](https://github.com/astral/uv) for Python environment and dependency management. Follow these steps to set up your development environment:


### Prerequisites

1. Install uv:
mac/linux:
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

windows
```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
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
uv sync
```

Available commands:
- `uv run pytest` - Run tests

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Create and activate a virtual environment (for Python-related tasks):
```bash
uv sync
source .venv/bin/activate  # On Unix/macOS
# or
.venv\Scripts\activate  # On Windows
```


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
   uv lock
   # For service-specific dependencies
   cd backend  # or frontend
   uv add package_name
   uv lock
   ```

5. The virtual environments (`.venv`) are project-specific and should not be committed to version control.

6. Run tests using:
```bash
uv run pytest
```

