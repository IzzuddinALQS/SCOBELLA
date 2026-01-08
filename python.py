import qrcode

# The data you want to store in the QR code
data = "https://scobella.vercel.app/"

# Generate the QR code
img = qrcode.make(data)

# Save the image
img.save("my_qr_code.png")