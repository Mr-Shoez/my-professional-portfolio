# Akatsuki-Themed Portfolio Website

A stylish, responsive portfolio website with an Akatsuki theme (inspired by Naruto anime). This project features modern animations, interactive elements, and a professional showcase of skills and projects.

![Akatsuki Portfolio](https://i.pinimg.com/originals/40/b8/28/40b828e9cf8de00d0e346ba692f03e1b.png)

## Features

- **Akatsuki-Themed Design**: Red and black color scheme with Akatsuki cloud elements
- **Interactive Loading Screen**: Custom loader with Akatsuki emblem
- **Animated Quote Introduction**: Opening quote in Akatsuki style
- **Three.js Background Animation**: Dynamic particle and ring animations
- **Responsive Design**: Fully responsive for all devices
- **Dynamic Navigation**: Smooth scrolling with active state highlighting
- **Skills Showcase**: Tabbed sections with animated skill bars
- **Project Portfolio**: Filterable project gallery with detailed project modals
- **Testimonials Slider**: Client testimonials with controls
- **Contact Form**: Styled form with validation
- **Dark/Light Theme Toggle**: Switch between dark and light modes
- **Custom Cursor**: Enhanced cursor design for desktop users
- **Scroll Animations**: Fade-in and reveal animations on scroll

## Technologies Used

- HTML5
- CSS3 (with custom variables and animations)
- JavaScript (ES6+)
- Three.js for 3D animations
- Font Awesome icons
- Google Fonts (Poppins)

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic knowledge of HTML, CSS, and JavaScript if you want to customize

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/akatsuki-portfolio.git
   ```

2. Open the project folder:
   ```bash
   cd akatsuki-portfolio
   ```

3. Open `index.html` in your browser or use a live server extension if you're using VS Code.

## Customization

### Changing Personal Information

1. Open `index.html` and update:
   - Your name in the hero section
   - About Me content
   - Projects information 
   - Contact details

2. Replace project images and descriptions with your own work

### Modifying the Theme

1. Edit the CSS variables in `css/style.css` to change colors:
   ```css
   :root {
     --primary-color: #ff0000;         /* Akatsuki red */
     --primary-color-dark: #cc0000;    /* darker red for hover states */
     --background-color: #121212;      /* dark background */
     /* other variables... */
   }
   ```

2. Update background images by changing the URLs in the CSS file

### Customizing Animations

1. Adjust animation parameters in `js/app.js`:
   - Loading screen duration
   - Typing speed for role words
   - Scroll animation thresholds

## Project Structure
