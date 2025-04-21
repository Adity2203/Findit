document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  
  mobileMenuBtn.addEventListener('click', function() {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  });
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        nav.style.display = 'none';
      }
    });
  });
  
  // Responsive nav list
  function handleResize() {
    if (window.innerWidth > 768) {
      nav.style.display = 'flex';
    } else {
      nav.style.display = 'none';
    }
  }
  
  window.addEventListener('resize', handleResize);
  handleResize();
  
  // Sample recent activity data
  const activities = [
    {
      icon: 'fa-search',
      title: 'Reported Lost Backpack',
      description: 'Black backpack with laptop - Reported yesterday',
      time: '2:45 PM'
    },
    {
      icon: 'fa-bell',
      title: 'New Potential Match',
      description: 'Similar water bottle found in Library',
      time: 'Yesterday'
    },
    {
      icon: 'fa-check-circle',
      title: 'Case Resolved',
      description: 'Your lost keys have been returned',
      time: '2 days ago'
    },
    {
      icon: 'fa-comment',
      title: 'New Message',
      description: 'Regarding your found wallet report',
      time: '3 days ago'
    }
  ];
  
  // Populate recent activity
  const activityList = document.querySelector('.activity-list');
  
  activities.forEach(activity => {
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    activityItem.innerHTML = `
      <i class="fas ${activity.icon}"></i>
      <div class="activity-details">
        <h4>${activity.title}</h4>
        <p>${activity.description} • ${activity.time}</p>
      </div>
    `;
    activityList.appendChild(activityItem);
  });
  
  // Make activity items clickable
  document.querySelectorAll('.activity-item').forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', function() {
      alert('In a complete implementation, this would show detailed activity information');
    });
  });
  
  // Make item cards clickable
  document.querySelectorAll('.item-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function() {
      alert('In a complete implementation, this would show item details');
    });
  });
});