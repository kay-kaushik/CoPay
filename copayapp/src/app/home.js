"use client";
import { useEffect, useRef } from 'react';
import './home.css';

export default function HomePage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas dimensions to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Animation variables
    let time = 0;
    
    // Animation function
    const animate = () => {
      time += 0.005;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `hsl(${200 + Math.sin(time) * 30}, 70%, 20%)`);
      gradient.addColorStop(0.5, `hsl(${260 + Math.cos(time) * 30}, 70%, 30%)`);
      gradient.addColorStop(1, `hsl(${320 + Math.sin(time) * 30}, 70%, 20%)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid pattern
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      
      const gridSize = 50;
      const offsetX = Math.sin(time) * 10;
      const offsetY = Math.cos(time) * 10;
      
      // Horizontal lines
      for (let y = offsetY % gridSize; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Vertical lines
      for (let x = offsetX % gridSize; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      animationFrameId = window.requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="landing-page">
      <canvas ref={canvasRef} className="background-canvas"></canvas>
      
      <div className="content-container">
        <h1 className="title">CoPay</h1>
        <p className="subtitle">Split expenses with friends. Simplified.</p>
        
        <div className="cta-container">
          <button className="signup-button">Sign Up</button>
          <button className="learn-more-button">Learn More</button>
        </div>
      </div>
      
      <div className="footer">
        <p>© 2023 CoPay. All rights reserved.</p>
      </div>
    </div>
  );
}
