document.addEventListener('DOMContentLoaded', function() {
  // Photo preview functionality
  const photoInput = document.getElementById('photo');
  const previewDiv = document.getElementById('preview');
  
  photoInput.addEventListener('change', function(e) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        alert('File size should be less than 2MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = function(event) {
        previewDiv.innerHTML = `<img src="${event.target.result}" alt="Item Preview">`;
        previewDiv.style.display = 'block';
      };
      reader.readAsDataURL(file);
    } else {
      previewDiv.style.display = 'none';
    }
  });

  // Form submission
  document.getElementById('lostForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic validation
    const itemName = document.getElementById('itemName').value.trim();
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value.trim();
    
    if (!itemName || !category || !description) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Prepare form data
    const formData = {
      itemName: itemName,
      category: category,
      description: description,
      lostDate: document.getElementById('lostDate').value,
      location: document.getElementById('location').value.trim(),
      contact: document.getElementById('contact').value.trim(),
      reward: document.getElementById('reward').value.trim(),
      hasPhoto: photoInput.files.length > 0
    };
    
    // In a real application, you would send this to your backend
    console.log('Lost item report:', formData);
    
    // Show success message
    alert('Your lost item report has been submitted successfully! We will notify you if it is found.');
    
    // Reset form
    this.reset();
    previewDiv.style.display = 'none';
    
    // In a real app, you might redirect or show a confirmation page
    // window.location.href = 'confirmation.html';
  });

  // Set default date to today
  document.getElementById('lostDate').valueAsDate = new Date();
});