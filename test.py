import numpy as np
import matplotlib.pyplot as plt

# Constants
L = 1.0         # Distance to the observation plane (arbitrary units)
wavelength = 0.5e-6  # Wavelength of the light (meters)

# Define the grid for the object plane
grid_size = 1024  # Define the grid size
x = np.linspace(-1, 1, grid_size)
y = np.linspace(-1, 1, grid_size)
X, Y = np.meshgrid(x, y)

# Define an arbitrary shape for the amplitude distribution
# Example: Circular aperture
R = 0.5e-1  # Radius of the aperture
t = np.zeros_like(X)
t[(np.abs(X) < R / 2) & (np.abs(Y) < R / 2)] = 1

# Compute the Fourier transform of the transmission function
T = np.fft.fftshift(np.fft.fft2(t))

# Compute the spatial frequency coordinates
fx = np.fft.fftshift(np.fft.fftfreq(grid_size, x[1] - x[0]))
fy = np.fft.fftshift(np.fft.fftfreq(grid_size, y[1] - y[0]))
FX, FY = np.meshgrid(fx, fy)

# Compute the intensity distribution in the observation plane
intensity = np.abs(T)**2

# Plot the intensity distribution
plt.figure(figsize=(10, 8))
plt.imshow(intensity, extent=(fx.min(), fx.max(), fy.min(), fy.max()), cmap='hot')
plt.title('Fraunhofer Diffraction Pattern')
plt.xlabel('Spatial Frequency $f_x$')
plt.ylabel('Spatial Frequency $f_y$')
plt.colorbar(label='Intensity')
plt.show()
