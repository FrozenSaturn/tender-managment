# B2B Tender Management Platform - How It All Works

Hey there! Welcome to the behind-the-scenes tour of our B2B Tender Management Platform. We're excited to show you how we built this thing from the ground up. Grab a coffee and let's walk through it together!

## The API - Our Backend Powerhouse

At the heart of everything is our Express.js API. Think of it as the brain that makes all the magic happen. We've organized it as a RESTful API, which basically means we keep things neat and tidy with clear, logical endpoints.

Here's how we've structured the main routes:

### `/api/auth` - Your Gateway
This is where the authentication magic happens. Whether you're signing up for the first time or logging back in, this endpoint has got you covered. It's like the bouncer at the club, but way friendlier.

### `/api/companies` - Your Business Profile Hub
Once you're logged in, this is your company's home base. You can check out your current info, make updates, and yes - upload that shiny new company logo you've been wanting to show off.

### `/api/tenders` - The Main Event
This is where the real action happens. Create new tenders, browse through all the public opportunities, or just check out what you've posted. It's basically the marketplace where all the business deals come to life.

### `/api/search` - Find What You Need
Simple but powerful. This public search lets anyone discover companies on the platform. Perfect for when you're looking for potential partners or just curious about who's in your industry.

We also use something called Zod for validation. It's like having a really thorough proofreader that checks all incoming data to make sure everything's formatted correctly before we process it. No more "garbage in, garbage out" situations!

## Keeping You Secure - The Authentication Flow

Security isn't just important to us - it's everything. Here's exactly how we keep your account safe without making things complicated:

### Step 1: You Log In
Pretty straightforward - you enter your email and password, either to sign up or log back in.

### Step 2: We Give You a Digital Pass
If everything checks out, our server creates a special token called a JWT (JSON Web Token). Think of it like a temporary VIP pass that proves you're you. This token contains your user ID and company ID, and it expires after 24 hours for security.

### Step 3: Your Browser Remembers
Your browser saves this token in localStorage - basically a secure little pocket where it keeps important stuff for later.

### Step 4: Automatic Authentication
From now on, whenever you try to do something that requires being logged in (like creating a tender), your browser automatically shows this token to our server. No need to log in again and again.

### Step 5: We Double-Check Everything
Our backend has a security guard (we call it `authMiddleware`) that checks every token on every request. It makes sure the token is legitimate and hasn't expired. Only then do we let you proceed.

This whole process happens in milliseconds, so you probably don't even notice it's working!

## The Logo Upload Story

Here's where things get interesting. We had a challenge: how do you handle company logos without slowing down your database?

Our solution? We partnered with Supabase Storage, and here's how the whole process works:

### The Upload Journey
1. **You Choose Your Logo**: On your company profile page, you select that perfect logo file
2. **We Catch It**: Your browser sends the image to our backend, where we use a tool called Multer to temporarily hold onto it
3. **Off to Supabase**: We immediately ship that image off to our Supabase storage bucket - a service that's specifically designed to handle files efficiently
4. **We Get a Public URL**: Supabase stores your image safely and gives us back a public URL where anyone can view it
5. **We Update Your Profile**: Finally, we save that URL to your company profile in our main database

The beauty of this approach? Your logo loads fast, our database stays lean, and we don't have to worry about storage limits. Everyone wins!

## Why This Architecture Works

We chose this setup because it's both robust and scalable. The Express.js backend gives us flexibility, JWT authentication keeps things secure without being cumbersome, and the Supabase integration means we can handle file uploads like a pro.

Plus, everything is organized in a way that makes sense. When you're looking for authentication stuff, you know exactly where to find it. Need to work on company features? There's a dedicated space for that too.

## What's Next?

This platform is constantly evolving based on user feedback and new requirements. We're always looking for ways to make the experience smoother, faster, and more intuitive.

Got questions about how something works? Found a bug? Have an idea for improvement? We'd love to hear from you!

---

*Built with ❤️ using Express.js, Supabase, and a whole lot of coffee*
