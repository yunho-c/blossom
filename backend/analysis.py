from FlagEmbedding import FlagAutoModel
import numpy as np
from typing import List, Optional, Union, Tuple
import plotly.graph_objects as go
import plotly.express as px
import time
# local
from utils import visualize_grid


# globals
time_start = time.time()
model = FlagAutoModel.from_finetuned("BAAI/bge-m3")  # text embedding model
time_end = time.time()
print(f"Time taken to load model: {time_end - time_start} seconds")

def calculate_cross_similarity(items: List[str]):
    l = len(items)  # length
    similarities = np.zeros([l, l])

    output = model.encode(
        items,
        return_dense=True,
        return_sparse=False,
        return_colbert_vecs=False,
    )
    dense, sparse, multiv = (
        output["dense_vecs"],
        output["lexical_weights"],
        output["colbert_vecs"],
    )

    # Calculate cosine similarity between all pairs of embeddings
    similarities = cosine_similarity(dense)

    return similarities


def cosine_similarity(embeddings: np.ndarray) -> np.ndarray:
    """
    Compute cosine similarity between all pairs of vectors in an embedding matrix.

    Args:
        embeddings: A numpy array of shape (n, d) where n is the number of vectors
                    and d is the dimension of each vector

    Returns:
        A numpy array of shape (n, n) containing the cosine similarities
        between all pairs of vectors
    """
    # Normalize the vectors (divide by their L2 norm)
    norms = np.linalg.norm(embeddings, axis=1, keepdims=True)
    normalized_embeddings = embeddings / norms

    # Compute dot products between all pairs of normalized vectors, yielding cosine similarity
    similarity_matrix = np.dot(normalized_embeddings, normalized_embeddings.T)

    return similarity_matrix


def test():
    fruits = ["apple", "fuji", "orange", "mandarin", "banana", "plantain"]
    similarities = calculate_cross_similarity(fruits)
    visualize_grid(similarities, row_labels=fruits, col_labels=fruits)


if __name__ == "__main__":
    test()
