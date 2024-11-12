import { useEffect } from 'react';

const Cursor = () => {
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    const circle = document.createElement('div');
    circle.classList.add('cursor-circle');
    document.body.appendChild(circle);

    let mouseX = 0, mouseY = 0;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;

      circle.style.left = `${mouseX}px`;
      circle.style.top = `${mouseY}px`;
      circle.style.animation = 'cursorCircleAnimation 0.4s ease-out forwards';
    };

    const createCircle = () => {
      const newCircle = document.createElement('div');
      newCircle.classList.add('cursor-circle');
      document.body.appendChild(newCircle);

      setTimeout(() => {
        newCircle.remove(); // Remove the circle after the animation ends
      }, 400);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('click', createCircle);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('click', createCircle);
      document.body.removeChild(cursor);
      document.body.removeChild(circle);
    };
  }, []);

  return null;
};

export default Cursor;
