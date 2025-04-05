import numpy as np
from typing import List, Optional, Union, Tuple
import plotly.graph_objects as go
import plotly.express as px


def visualize_grid(
    grid_data: Union[List[List[int]], np.ndarray],
    title: str = "2D Grid Visualization",
    colorscale: str = "Viridis",
    show_values: bool = True,
    width: int = 800,
    height: int = 800,
    show_figure: bool = True,
    save_path: Optional[str] = None,
    value_range: Optional[Tuple[float, float]] = None,
    row_labels: Optional[List[str]] = None,
    col_labels: Optional[List[str]] = None,
) -> go.Figure:
    """
    Visualize 2D grid data with values [0, 1] using plotly.

    Parameters:
    -----------
    grid_data : Union[List[List[int]], np.ndarray]
        2D grid data with values [0, 1]
    title : str, optional
        Title of the plot
    colorscale : str, optional
        Colorscale to use for the heatmap
    show_values : bool, optional
        Whether to show the values in the cells
    width : int, optional
        Width of the figure in pixels
    height : int, optional
        Height of the figure in pixels
    show_figure : bool, optional
        Whether to show the figure
    save_path : Optional[str], optional
        Path to save the figure
    value_range : Optional[Tuple[float, float]], optional
        Range of values to use for the colorscale, by default None (auto-detected)
    row_labels : Optional[List[str]], optional
        Custom labels for rows. Length must match the number of rows in grid_data.
    col_labels : Optional[List[str]], optional
        Custom labels for columns. Length must match the number of columns in grid_data.

    Returns:
    --------
    go.Figure
        Plotly figure object

    Examples:
    ---------
    >>> import numpy as np
    >>> # Create a 5x5 grid with random binary values
    >>> grid = np.random.randint(0, 2, size=(5, 5))
    >>> fig = visualize_grid(grid, title="Random Binary Grid")
    >>>
    >>> # With custom labels
    >>> row_labels = ['Row A', 'Row B', 'Row C', 'Row D', 'Row E']
    >>> col_labels = ['Col 1', 'Col 2', 'Col 3', 'Col 4', 'Col 5']
    >>> fig = visualize_grid(grid, title="Labeled Grid", row_labels=row_labels, col_labels=col_labels)
    """
    # Convert to numpy array if it's a list
    if isinstance(grid_data, list):
        grid_data = np.array(grid_data)

    # Validate input data
    if grid_data.ndim != 2:
        raise ValueError("Input grid_data must be a 2D array")

    # Check if values are within [0, 1] range
    if np.min(grid_data) < 0 or np.max(grid_data) > 1:
        print("Warning: Grid contains values outside the [0, 1] range")

    # Validate labels if provided
    n_rows, n_cols = grid_data.shape
    if row_labels is not None and len(row_labels) != n_rows:
        raise ValueError(f"Length of row_labels ({len(row_labels)}) must match number of rows in grid_data ({n_rows})")
    if col_labels is not None and len(col_labels) != n_cols:
        raise ValueError(f"Length of col_labels ({len(col_labels)}) must match number of columns in grid_data ({n_cols})")

    # Create figure
    fig = go.Figure()

    # Set z_range for consistent color mapping
    z_min, z_max = value_range if value_range else (0, 1)

    # Add heatmap trace
    heatmap = go.Heatmap(
        z=grid_data,
        colorscale=colorscale,
        zmin=z_min,
        zmax=z_max,
        showscale=True,
        text=grid_data if show_values else None,
        texttemplate="%{text:.2f}" if show_values else None,
    )
    fig.add_trace(heatmap)

    # Update layout
    xaxis_config = {
        "title": "Column Index",
        "showgrid": True,
    }

    yaxis_config = {
        "title": "Row Index",
        "showgrid": True,
        "autorange": "reversed",  # To match matrix orientation (0,0 at top-left)
    }

    # Apply custom labels if provided
    if col_labels is not None:
        xaxis_config.update({
            "tickmode": "array",
            "tickvals": list(range(len(col_labels))),
            "ticktext": col_labels
        })
    else:
        xaxis_config.update({
            "tickmode": "linear",
            "tick0": 0,
            "dtick": 1
        })

    if row_labels is not None:
        yaxis_config.update({
            "tickmode": "array",
            "tickvals": list(range(len(row_labels))),
            "ticktext": row_labels
        })
    else:
        yaxis_config.update({
            "tickmode": "linear",
            "tick0": 0,
            "dtick": 1
        })

    fig.update_layout(
        title=title,
        width=width,
        height=height,
        xaxis=xaxis_config,
        yaxis=yaxis_config,
    )

    # Show figure if requested
    if show_figure:
        fig.show()

    # Save figure if path is provided
    if save_path:
        fig.write_image(save_path)

    return fig


def test():
    # Example: Random grid with values between 0 and 1
    continuous_grid = np.random.random(size=(8, 8))
    visualize_grid(
        continuous_grid,
        title="Random Continuous Grid (8x8)",
        colorscale="Plasma",
        show_figure=True,
    )

    # Example with custom labels
    row_labels = [f"Row {chr(65+i)}" for i in range(8)]  # Row A, Row B, etc.
    col_labels = [f"Col {i+1}" for i in range(8)]        # Col 1, Col 2, etc.

    visualize_grid(
        continuous_grid,
        title="Labeled Grid (8x8)",
        colorscale="Plasma",
        row_labels=row_labels,
        col_labels=col_labels,
        show_figure=True,
    )


if __name__ == "__main__":
    test()
