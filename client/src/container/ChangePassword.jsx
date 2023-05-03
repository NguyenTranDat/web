import React from 'react';

function ChangePassword() {
    return (
        <div class="container mt-5">
            <div class="row justify-content-center">
            <div class="col-md-6">
                <h2>Change Password</h2>
                <form>
                <div class="form-group">
                    <label for="current-password">Current Password</label>
                    <input type="password" name="currentPassword" id="current-password" class="form-control" />
                </div>
                <div class="form-group">
                    <label for="new-password">New Password</label>
                    <input type="password" name="newPassword" id="new-password" class="form-control" />
                </div>
                <div class="form-group">
                    <label for="confirm-password">Confirm Password</label>
                    <input type="password" name="confirmPassword" id="confirm-password" class="form-control" />
                </div>
                <button type="submit" class="btn btn-primary btn-block">Save Changes</button>
                </form>
            </div>
            </div>
        </div>
    );
}

export default ChangePassword;