import matplotlib.pyplot as plt
import numpy as np

def generate_sequence(a, b, n):
    ellipses = [(a, b)]
    rectangles = []

    current_a, current_b = a, b
    for _ in range(n):
        rect_width = 2 * current_a
        rect_height = 2 * current_b
        rectangles.append((rect_width, rect_height))

        current_a = current_a * np.sqrt(2)
        current_b = current_b * np.sqrt(2)
        ellipses.append((current_a, current_b))

    return ellipses, rectangles

def plot_sequence(a, b, n):
    ellipses, rectangles = generate_sequence(a, b, n)

    fig, ax = plt.subplots(figsize=(8, 8))
    ax.set_aspect('equal')

    theta = np.linspace(0, 2*np.pi, 150)
    x = ellipses[0][0] * np.cos(theta)
    y = ellipses[0][1] * np.sin(theta)
    ax.plot(x, y, 'b', label=f'Original Ellipse\n(a={a}, b={b})')

    colors = plt.cm.viridis(np.linspace(0, 1, n))
    for i in range(n):
        # Plot rectangle
        rect_w, rect_h = rectangles[i]
        rect = plt.Rectangle((-rect_w/2, -rect_h/2), rect_w, rect_h,
                            edgecolor='r', linestyle='--', fill=False,
                            label=f'Rectangle {i+1}' if i == 0 else "")
        ax.add_patch(rect)

        # Plot ellipse
        e_a, e_b = ellipses[i+1]
        x_e = e_a * np.cos(theta)
        y_e = e_b * np.sin(theta)
        ax.plot(x_e, y_e, color=colors[i],
               label=f'Ellipse {i+1}\n(A={e_a:.2f}, B={e_b:.2f})')

    max_dim = max(ellipses[-1][0], ellipses[-1][1])
    ax.set_xlim(-max_dim*1.2, max_dim*1.2)
    ax.set_ylim(-max_dim*1.2, max_dim*1.2)
    ax.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
    ax.set_title(f'Nested Ellipses & Rectangles (n={n})')
    ax.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.show()

plot_sequence(a=2, b=1, n=52)
