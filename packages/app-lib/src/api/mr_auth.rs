use crate::state::BlankethubCredentials;

#[tracing::instrument]
pub fn authenticate_begin_flow() -> &'static str {
    crate::state::get_login_url()
}

#[tracing::instrument]
pub async fn authenticate_finish_flow(
    code: &str,
) -> crate::Result<BlankethubCredentials> {
    let state = crate::State::get().await?;

    let creds = crate::state::finish_login_flow(
        code,
        &state.api_semaphore,
        &state.pool,
    )
    .await?;

    creds.upsert(&state.pool).await?;
    state
        .friends_socket
        .connect(&state.pool, &state.api_semaphore, &state.process_manager)
        .await?;

    Ok(creds)
}

#[tracing::instrument]
pub async fn logout() -> crate::Result<()> {
    let state = crate::State::get().await?;
    let current = BlankethubCredentials::get_active(&state.pool).await?;

    if let Some(current) = current {
        BlankethubCredentials::remove(&current.user_id, &state.pool).await?;
        state.friends_socket.disconnect().await?;
    }

    Ok(())
}

#[tracing::instrument]
pub async fn get_credentials() -> crate::Result<Option<BlankethubCredentials>> {
    let state = crate::State::get().await?;
    let current =
        BlankethubCredentials::get_and_refresh(&state.pool, &state.api_semaphore)
            .await?;

    Ok(current)
}
