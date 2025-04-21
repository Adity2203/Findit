document.addEventListener('DOMContentLoaded', function() {
  // Photo preview functionality
  const photoInput = document.getElementById('photo');
  const previewDiv = document.getElementById('preview');
  
  photoInput.addEventListener('change', function(e) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = function(event) {
        previewDiv.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
        previewDiv.style.display = 'block';
      };
      
      reader.readAsDataURL(file);
    } else {
      previewDiv.style.display = 'none';
    }
  });

  // Form submission
  document.getElementById('foundForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = {
      itemName: document.getElementById('itemName').value,
      category: document.getElementById('category').value,
      description: document.getElementById('description').value,
      foundDate: document.getElementById('foundDate').value,
      location: document.getElementById('location').value,
      contact: document.getElementById('contact').value,
      photo: photoInput.files[0] ? photoInput.files[0].name : null
    };
    
    // In a real app, you would send this data to your backend
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Found item report submitted successfully! Our team will help connect you with the owner.');
    
    // Reset form
    this.reset();
    previewDiv.style.display = 'none';
    
    // In a real app, you might redirect to another page
    // window.location.href = 'thankyou.html';
  });
});