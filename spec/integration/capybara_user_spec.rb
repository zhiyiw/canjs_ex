require 'spec_helper'

describe 'Add User' do
  let(:first_name) { 'Mason' }
  let(:last_name)  { 'Shin' }
  let(:email)      { 'mason.shin@spirent.com' }
  
  before(:all) do
    Capybara.javascript_driver = :webkit
  end
  
  before(:each) do
    visit '/'
  end
  
  it 'should create a user with valid information', :js => true do
    # Find creating user form
    page.should have_css('div.create_user')
    
    # Fill up the form
    fill_in 'first_name', :with => first_name
    fill_in 'last_name',  :with => last_name
    fill_in 'email',      :with => email
    
    # click the add button
    find('div.add_user_btn').click
    
    # wait until the saving finished
    wait_until { page.should have_css('div.ur_name') }
    
    # confirm new list item value
    page.should have_content(first_name)
  end
end