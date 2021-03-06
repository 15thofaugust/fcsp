require "rails_helper"

RSpec.describe CandidatesController, type: :controller do
  let(:user) {FactoryBot.create :user}
  let!(:job) {FactoryBot.create :job}

  before :each do
    sign_in user
  end

  describe "POST #create" do
    it "apply job" do
      job2 = FactoryBot.create :job
      post :create, params: {id: job2}
      expect{user.apply_job job}.to change(Candidate, :count).by 1
    end

    it "not bookmark job without job" do
      candidate_params = FactoryBot.create :job, id: nil
      post :create, params: {id: candidate_params}
      expect{response}.to change(Candidate, :count).by 0
    end
  end

  describe "DELETE #destroy" do
    let!(:candidate){FactoryBot.create :candidate, user: user, job: job}
    context "delete successfully" do
      before{delete :destroy, params: {id: job}}
      it{expect{response.to change(Candidate, :count).by -1}}
    end
  end
end
