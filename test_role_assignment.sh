#!/bin/bash

# Test script for role-based client assignment

echo "=== Testing Role-Based Client Assignment ==="
echo ""

# First, let's check if the role column exists
echo "1. Checking if role column exists..."
cd /c/Users/batia/OneDrive/Desktop/Edmyr/Full_Stack_Journey/myProjects/crm-lite

# Try to add the role column if it doesn't exist
php artisan tinker --execute="
try {
    if (!Schema::hasColumn('users', 'role')) {
        DB::statement('ALTER TABLE users ADD COLUMN role VARCHAR(255) DEFAULT \"user\" AFTER email');
        echo 'Role column added successfully!';
    } else {
        echo 'Role column already exists!';
    }
} catch (Exception \$e) {
    echo 'Error: ' . \$e->getMessage();
}
"

echo ""
echo "2. Creating test users..."

# Create an admin user
php artisan tinker --execute="
try {
    \$admin = App\Models\User::updateOrCreate(
        ['email' => 'admin@test.com'],
        [
            'first_name' => 'Admin',
            'last_name' => 'User',
            'password' => bcrypt('password'),
            'role' => 'admin'
        ]
    );
    echo 'Admin user created/updated: ' . \$admin->first_name . ' ' . \$admin->last_name . ' (ID: ' . \$admin->id . ')';
} catch (Exception \$e) {
    echo 'Error creating admin: ' . \$e->getMessage();
}
"

echo ""

# Create a regular user
php artisan tinker --execute="
try {
    \$user = App\Models\User::updateOrCreate(
        ['email' => 'user@test.com'],
        [
            'first_name' => 'Regular',
            'last_name' => 'User',
            'password' => bcrypt('password'),
            'role' => 'user'
        ]
    );
    echo 'Regular user created/updated: ' . \$user->first_name . ' ' . \$user->last_name . ' (ID: ' . \$user->id . ')';
} catch (Exception \$e) {
    echo 'Error creating user: ' . \$e->getMessage();
}
"

echo ""
echo "3. Checking user roles..."

php artisan tinker --execute="
App\Models\User::whereIn('email', ['admin@test.com', 'user@test.com'])
    ->get(['id', 'first_name', 'email', 'role'])
    ->each(function(\$u) {
        echo PHP_EOL . '- ' . \$u->first_name . ' (' . \$u->email . ') - Role: ' . (\$u->role ?? 'not set');
    });
"

echo ""
echo "=== Test Complete ==="
echo ""
echo "You can now:"
echo "1. Login as admin@test.com with password: password"
echo "2. Login as user@test.com with password: password"
echo "3. Navigate to /clients/create to test the role-based assignment"
echo ""
echo "Expected behavior:"
echo "- Admin users can assign clients to any user"
echo "- Regular users can only assign clients to themselves"
